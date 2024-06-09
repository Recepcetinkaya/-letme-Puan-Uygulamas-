import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../Shared/Colors';
import * as Location from 'expo-location'; // Expo Location paketini import edin

export default function BusinessItem({ place }) {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        })();
    }, []);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth radius in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d; // Distance in kilometers
    };

    const isNearby = (placeLocation, userLocation) => {
        const distance = calculateDistance(
            placeLocation.latitude,
            placeLocation.longitude,
            userLocation.latitude,
            userLocation.longitude
        );
        return distance <= 10; // Check if the place is within 10 kilometers of user location
    };

    return (
        <View style={{
            width: 140, backgroundColor: Colors.WHITE,
            borderRadius: 10, padding: 10, margin: 5, elevation: 0.4
        }}>
            {place?.photos ? (
                <Image
                    source={{
                        uri: "https://maps.googleapis.com/maps/api/place/photo" +
                            "?maxwidth=400" +
                            "&photo_reference=" +
                            place?.photos[0]?.photo_reference +
                            "&key=AIzaSyDC3NRr4e6IFPo97pNjt8EofMtVaMhnUBM",
                    }}
                    style={{ width: 120, height: 80, borderRadius: 10 }}
                />
            ) : (
                <Image
                    source={require('./../../../assets/placeholder.jpg')}
                    style={{ width: 130, height: 100, borderRadius: 9 }}
                />
            )}
            <Text numberOfLines={2} style={{ fontSize: 16, marginTop: 5 }}>{place.name}</Text>
            <Text numberOfLines={2} style={{ fontSize: 13, marginTop: 5, color: Colors.DARK_GRAY }}>
                {place.vicinity ? place.vicinity : place.formatted_address}
            </Text>
            <View style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 5,
                flexDirection: "row",
                marginBottom: -5
            }}>
                <AntDesign name="star" size={20} color={Colors.YELLOW} />
                <Text>{place.rating}</Text>
            </View>
            
            {/* Kullanıcı konumu burada gösterilebilir */}
            {userLocation && isNearby(place.geometry.location, userLocation) && (
                <Text style={{ color: 'green' }}>Nearby</Text>
            )}
        </View>
    );
}
