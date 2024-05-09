import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Fav() {
  const [rating, setRating] = useState(0);
  const [placeInfo, setPlaceInfo] = useState({
    name: 'Mekan Adı',
    address: 'Mekan Adresi',
    description: 'Mekan Açıklaması',
  });

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <Text style={styles.title}>Mekan Bilgileri</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Mekan Adı:</Text>
          <Text style={styles.value}>{placeInfo.name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Adres:</Text>
          <Text style={styles.value}>{placeInfo.address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Açıklama:</Text>
          <Text style={styles.value}>{placeInfo.description}</Text>
        </View>
      </View>
      <View style={styles.ratingBox}>
        <Text style={styles.title}>Mekanı Puanla</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity key={value} onPress={() => handleRating(value)}>
              <Ionicons
                name={value <= rating ? 'star' : 'star-outline'}
                size={40}
                color={value <= rating ? '#FFD700' : '#CCCCCC'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.ratingText}>Puanınız: {rating}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  infoBox: {
    marginBottom: 30,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
  },
});
