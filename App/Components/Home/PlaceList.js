import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PlaceItem from './PlaceItem';
import PlaceItemBig from './PlaceItemBig';
import { useNavigation } from '@react-navigation/native';
import api from '../../Services/GlobalApi';
import * as Location from 'expo-location'; 

export default function PlaceList() {
    const [placeList, setPlaceList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchNearbyPlaces(); 
    }, []);

    const fetchNearbyPlaces = async () => {
        try {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Location permission denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // API çağrısı yap
            const response = await api.nearByPlace(latitude, longitude, 'restaurant');
            setPlaceList(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onPlaceClick = (item) => {
        navigation.navigate('PlaceDetail', { place: item });
    };

    const keyExtractor = (item) => item.place_id.toString();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isLoading ? 'Loading...' : `${placeList.length} yer bulundu`}
            </Text>

            {isLoading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={placeList}
                    keyExtractor={keyExtractor}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => onPlaceClick(item)} style={styles.touchable}>
                            {index % 4 === 0 ? (
                                <PlaceItemBig place={item} />
                            ) : (
                                <PlaceItem place={item} />
                            )}
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFE4B5',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    touchable: {
        marginBottom: 16,
    },
});
