import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ApiURL from '../ApiURL'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    useEffect(() => {
        const getAsyncData = async () => {
            const userData = await AsyncStorage.getItem('userDetail')
            console.log("userData", userData)
            if (userData !== null) {
                navigation.navigate('DashBoard')
            }
        }
        getAsyncData()
    }, [])
    const submit = async () => {
        try {

            if (email === '') {
                setErrorPassword(false)
                return setErrorEmail(true)
            } else if (password === '') {
                setErrorEmail(false)
                return setErrorPassword(true)
            } else {
                setErrorEmail(false)
                setErrorPassword(false)
                const data = {
                    email: email.toLowerCase().trim(),
                    password: password
                }
                const loginPost = await axios.post(`${ApiURL}auth/signin`, data)
                console.log("loginPost", loginPost.data)
                await AsyncStorage.setItem('userDetail', JSON.stringify(loginPost.data));
                setEmail('')
                setPassword('')
            }
            navigation.navigate('DashBoard')
        } catch (error) {
            console.log(error)
            Alert.alert('Login Failed!', 'Enter valid Credential')
        }
    }

    return (
        <ImageBackground
            resizeMode='stretch'
            source={require('../assets/images/image.png')}
            style={styles.screen}
        >
            <View style={styles.loginContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} value={email}
                    placeholderTextColor="#ffffff"
                    keyboardType='email-address'
                    onChangeText={(text) => { setEmail(text) }} placeholder='Enter your mail' />
                {errorEmail && <Text style={styles.error}>enter your valid mail</Text>}
                <TextInput style={styles.input} value={password}
                    placeholderTextColor="#ffffff"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)} placeholder='Enter your password' />
                {errorPassword && <Text style={styles.error}>enter your valid password</Text>}
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.btn]}
                    android_ripple={{ color: 'green' }}
                    onPress={submit}
                >
                    <Text style={styles.btnTextColor}>submit</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [pressed && styles.btn]}
                    android_ripple={{ color: 'green' }}
                >
                    <Text onPress={() => navigation.navigate('Registration')} style={styles.signup}>SignUp</Text>
                </Pressable>

            </View>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        paddingTop: 50,
        width: '80%',
        height: 400,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
        backgroundColor: 'black',
        opacity: 0.75
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    input: {
        width: 250,
        height: 50,
        marginTop: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#dddddd',
        fontWeight: '400',
        borderRadius: 10,
        paddingHorizontal: 15,
        elevation: 3,
        color: 'white'
    },
    error: {
        color: 'red'
    },
    btn: {
        opacity: 0.5,
    },
    button: {
        marginTop: 40,
        width: 150,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#05eff7'
    },
    btnTextColor: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    signup: {
        marginTop: 10,
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'blue'
    }

})