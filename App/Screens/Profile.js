import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Kullanıcı Adı:</Text>
        <Text style={styles.value}>Recep</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>E-posta:</Text>
        <Text style={styles.value}>cetinKayar@example.com</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Doğum Tarihi:</Text>
        <Text style={styles.value}>01/01/2002</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.value}>123-456-7890</Text>
      </View>
      {/* Diğer profil bilgilerini buraya ekleyebilirsiniz */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
});
