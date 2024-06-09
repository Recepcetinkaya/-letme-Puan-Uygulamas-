import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function PlaceMarker({ item }) {
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

    if (!userLocation) {
        // Konum bilgisi henüz alınmadıysa veya izin verilmediyse
        return null;
    }

    return (
        <Marker
            title={item.name}
            coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
            }}
        >
            <View style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>{item.name}</Text>
            </View>
        </Marker>
    );
}
