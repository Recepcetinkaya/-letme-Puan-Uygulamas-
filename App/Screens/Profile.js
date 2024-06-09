import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = ({ route }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchProfileData(user.uid);
      } else {
        console.log("No user is signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(FIRESTORE_DB, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfileData(userData);
        setName(userData.username);
        setEmail(userData.email);
        setFetchingData(false);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setFetchingData(false);
    }
  };

  const handleUpdate = async () => {
    if (!userId) {
      alert("User is not authenticated");
      return;
    }

    try {
      setLoading(true);
      await updateDoc(doc(FIRESTORE_DB, "users", userId), {
        username: name,
        email: email,
        password: password,
      });
      setLoading(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningText}>
        Şu anda Yalnızca Adınızı ve Şifrenizi Güncelleyebilirsiniz*
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>ADI</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Şifreniz</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Güncellendi" : "Profil Güncelle"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 40,
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  warningText: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 70,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    color: "white",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Profile;
