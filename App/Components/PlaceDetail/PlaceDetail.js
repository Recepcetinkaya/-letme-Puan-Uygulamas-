import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, Linking, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PlaceDetailItem from './PlaceDetailItem';
import Colors from '../../Shared/Colors';
import GoogleMapView from '../Home/GoogleMapView';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetail() {
  const param = useRoute().params;
  const [place, setPlace] = useState({});
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    setPlace(param.place);
  }, []);

  const onDirectionClick = () => {
    if (!location) {
      alert("Location not available");
      return;
    }

    const url = Platform.select({
      ios: `maps:${location.coords.latitude},${location.coords.longitude}?q=${place.vicinity}`,
      android: `geo:${location.coords.latitude},${location.coords.longitude}?q=${place.vicinity}`,
    });

    Linking.openURL(url);
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <PlaceDetailItem place={place} onDirectionClick={onDirectionClick} />
      <GoogleMapView placeList={[place]} />
      <TouchableOpacity style={styles.directionButton} onPress={onDirectionClick}>
        <Ionicons name="navigate-circle-outline" size={30} color="white" />
        <Text style={styles.directionButtonText}>Get Direction on Google Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  directionButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  directionButtonText: {
    textAlign: 'center',
    color: Colors.WHITE,
    marginLeft: 10,
  },
});
