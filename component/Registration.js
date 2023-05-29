import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ApiURL from '../ApiURL'
import axios from 'axios'

const Registration = ({ navigation }) => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorFname, setErrorFname] = useState(false)
    const [errorLname, setErrorLname] = useState(false)
    const [errorPhone, setErrorPhone] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)


    const signup = async () => {
        try {
            if (fname === '') {
                setErrorLname(false)
                setErrorPhone(false)
                setErrorEmail(false)
                setErrorPassword(false)
                return setErrorFname(true)
            } else if (lname === '') {
                setErrorFname(false)
                setErrorPhone(false)
                setErrorEmail(false)
                setErrorPassword(false)
                return setErrorLname(true)
            } else if (phone === '') {
                setErrorFname(false)
                setErrorLname(false)
                setErrorEmail(false)
                setErrorPassword(false)
                return setErrorPhone(true)
            } else if (email === '') {
                setErrorFname(false)
                setErrorLname(false)
                setErrorPhone(false)
                setErrorPassword(false)
                return setErrorEmail(true)
            } else if (password === '') {
                setErrorFname(false)
                setErrorLname(false)
                setErrorPhone(false)
                setErrorEmail(false)
                return setErrorPassword(true)
            } else {
                setErrorFname(false)
                setErrorLname(false)
                setErrorPhone(false)
                setErrorEmail(false)
                setErrorPassword(false)
                const data = {
                    fname: fname,
                    lname: lname,
                    phone: phone,
                    email: email.toLowerCase().trim(),
                    password: password
                }

                const signupPost = await axios.post(`${ApiURL}auth/signup`, data)
                console.log("loginPost", signupPost.data)
                console.log(data)
                navigation.navigate('Login')
                setFname('')
                setLname('')
                setPhone('')
                setEmail('')
                setPassword('')
            }

        } catch (error) {
            console.log(error)
            Alert.alert('Regi Failed!', 'Enter valid Inputs')
        }
    }

    return (
        <ImageBackground
            resizeMode='stretch'
            source={require('../assets/images/image.png')}
            style={styles.screen}
        >
            <ScrollView style={styles.scroll}>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>SignUp</Text>
                    <TextInput style={styles.input} value={fname}
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => { setFname(text) }} placeholder='Enter your first name' />
                    {errorFname && <Text style={styles.error}>first name required</Text>}
                    <TextInput style={styles.input} value={lname}
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => { setLname(text) }} placeholder='Enter your last name' />
                    {errorLname && <Text style={styles.error}>last name required</Text>}
                    <TextInput style={styles.input} value={phone}
                        keyboardType="number-pad"
                        placeholderTextColor="#ffffff"
                        onChangeText={(text) => { setPhone(text) }} placeholder='Enter your Phone number' />
                    {errorPhone && <Text style={styles.error}>phone number required</Text>}
                    <TextInput style={styles.input} value={email}
                        placeholderTextColor="#ffffff"
                        keyboardType="email-address"
                        onChangeText={(text) => { setEmail(text) }} placeholder='Enter your mail' />
                    {errorEmail && <Text style={styles.error}>mail required</Text>}
                    <TextInput style={styles.input} value={password}
                        placeholderTextColor="#ffffff"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)} placeholder='Enter your password' />
                    {errorPassword && <Text style={styles.error}>password required</Text>}
                    <Pressable
                        style={({ pressed }) => [styles.button, pressed && styles.btn]}
                        android_ripple={{ color: 'green' }}
                        onPress={signup}
                    >
                        <Text style={styles.btnTextColor}>submit</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [pressed && styles.btn]}
                        android_ripple={{ color: 'green' }}
                    >
                        <Text onPress={() => navigation.navigate('Login')} style={styles.signup}>SignIn</Text>
                    </Pressable>

                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Registration

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     marginTop: 100,
    //     alignItems: 'center'
    // },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scroll: {
        flex: 1,
        marginTop: 80,
        marginLeft: 70,
        width: '100%'
    },
    loginContainer: {
        paddingTop: 10,
        width: '80%',
        height: 600,
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