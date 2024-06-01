import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig'; // firebaseConfig'den FIREBASE_AUTH ve FIRESTORE_DB'yi import yapın

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Kayıt işlemini gerçekleştiren fonksiyon
    const handleRegister = async () => {
        try {
            // Kullanıcıyı Firebase Authentication ile oluşturun
            const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            
            // Kullanıcı oluşturulduktan sonra, kullanıcı verilerini Firestore'a kaydedin
            const userId = userCredential.user.uid; // Kullanıcının benzersiz kimliği
            const usersCollectionRef = collection(FIRESTORE_DB, 'users');
            
            // Kullanıcı verilerini Firestore'a ekleyin
            await addDoc(usersCollectionRef, {
                userId,
                email,
                // Diğer kullanıcı bilgilerini burada saklayabilirsiniz (örneğin, kullanıcı adı, soyadı, vb.)
            });
    
            // Kayıt işlemi başarılı olduysa, kullanıcıyı `LoginScreen`'e yönlendirin
            navigation.navigate('LoginScreen');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Bu e-posta adresi zaten kullanımda. Lütfen başka bir e-posta adresi kullanın.');
            } else {
                console.error('Kayıt işlemi başarısız:', error);
                alert('Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Kayıt Ol</Text>
            <TextInput
                style={styles.input}
                placeholder="E-posta"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Kayıt Ol" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default RegisterScreen;
