import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_APP } from '../../firebaseConfig';

const logo = require("../../assets/logo.png");

const LoginScreen = ({ navigation }) => {
    const [click, setClick] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth(FIREBASE_APP);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('TabNavigation');
        } catch (error) {
            console.error('Oturum açma başarısız:', error);
            alert('Giriş başarısız oldu. Lütfen e-posta ve şifrenizi kontrol edin.');
        }
    };

    const handleNavigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={logo} style={styles.image} resizeMode='contain' />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    placeholder='EMAIL OR USERNAME'
                    placeholderTextColor="#fff" // Set placeholder text color to white
                    value={email}
                    onChangeText={setEmail}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
                <TextInput
                    style={styles.input}
                    placeholder='PASSWORD'
                    placeholderTextColor="#fff" // Set placeholder text color to white
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    autoCorrect={false}
                    autoCapitalize='none'
                />
            </View>
            <View style={styles.rememberView}>
                <View style={styles.switch}>
                    <Switch value={click} onValueChange={setClick} trackColor={{ true: "green", false: "gray" }} />
                    <Text style={styles.rememberText}>Remember Me</Text>
                </View>
                <View>
                    <Pressable onPress={() => Alert.alert("Forget Password!")}>
                        <Text style={styles.forgetText}>Forgot Password?</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.buttonView}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </Pressable>
                <Text style={styles.optionsText}>OR LOGIN WITH</Text>
            </View>

            <Text style={styles.footerText}>
                Don't Have Account?<Text style={styles.signup} onPress={handleNavigateToRegister}>  Sign Up</Text>
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 70,
        backgroundColor: '#333', // Dark gray background
        flex: 1, // Ensures the background color covers the whole screen
    },
    image: {
        height: 160,
        width: 170
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase",
        textAlign: "center",
        paddingVertical: 40,
        color: "red"
    },
    inputView: {
        gap: 15,
        width: "100%",
        paddingHorizontal: 40,
        marginBottom: 5
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderColor: "red",
        borderWidth: 1,
        borderRadius: 7,
        color: '#fff', // Text color to white for better readability
    },
    rememberView: {
        width: "100%",
        paddingHorizontal: 50,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    switch: {
        flexDirection: "row",
        gap: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    rememberText: {
        fontSize: 13,
        color: '#fff', // Text color to white for better readability
    },
    forgetText: {
        fontSize: 11,
        color: "red"
    },
    button: {
        backgroundColor: "#6a0dad", // Purple background for the button
        height: 45,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonView: {
        width: "100%",
        paddingHorizontal: 50
    },
    optionsText: {
        textAlign: "center",
        paddingVertical: 10,
        color: "gray",
        fontSize: 13,
        marginBottom: 6
    },
    footerText: {
        textAlign: "center",
        color: "gray",
    },
    signup: {
        color: "red",
        fontSize: 13
    }
});

export default LoginScreen;
