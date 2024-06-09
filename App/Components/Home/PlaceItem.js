import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Shared/Colors';
import HorizontalLine from './HorizontalLine';

const PlaceItem = ({ place }) => {
    const [userRating, setUserRating] = useState(null);

    const handleStarPress = (rating) => {
        setUserRating(rating);
    };

    return (
        <View style={styles.card}>
            {place.photos ? (
                <Image
                    source={{
                        uri:
                            "https://maps.googleapis.com/maps/api/place/photo" +
                            "?maxwidth=400" +
                            "&photo_reference=AIzaSyDC3NRr4e6IFPo97pNjt8EofMtVaMhnUBM" +
                            place.photos[0].photo_reference +
                            "&key=",
                    }}
                    style={styles.image}
                />
            ) : (
                <Image
                    source={require('../../../assets/placeholder.jpg')}
                    style={styles.image}
                />
            )}
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{place.name}</Text>
                <Text style={styles.vicinity} numberOfLines={2}>{place.vicinity}</Text>
                <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={20} color={Colors.YELLOW} />
                    <Text>{place.rating}</Text>
                </View>
                <View style={styles.userRatingContainer}>
                    {Array.from({ length: 5 }, (_, index) => (
                        <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                            <AntDesign 
                                name="star" 
                                size={20} 
                                color={index < userRating ? Colors.YELLOW : Colors.GRAY} 
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#EEE8AA',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        marginVertical: 8,
        padding: 10,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 15,
    },
    info: {
        flex: 1,
        paddingLeft: 15,
    },
    name: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'raleway-bold',
    },
    vicinity: {
        fontSize: 16,
        marginBottom: 5,
        color: Colors.DARK_GRAY,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PlaceItem;
