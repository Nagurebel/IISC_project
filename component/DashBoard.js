import { Pressable, ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import ApiURL from '../ApiURL'

const DashBoard = ({ navigation }) => {

    const [asyncData, setAsyncData] = useState()
    const [userDetail, setUserDetail] = useState([])
    const [evDetail, setEvDetail] = useState([])

    useEffect(() => {
        getAsyncData()
        userDetailsGet()
        evStationGet()
    }, [])

    const getAsyncData = async () => {
        const userData = await AsyncStorage.getItem('userDetail')
        setAsyncData(JSON.parse(userData))
    }

    const userDetailsGet = async () => {
        const userDataGet = await axios.get(`${ApiURL}auth/users`)
        // console.log(userDataGet.data.data)
        setUserDetail(userDataGet.data.data)
    }

    const evStationGet = async () => {
        const EvStationDataGet = await axios.get(`${ApiURL}evstation`)
        console.log("EvStationDataGet", EvStationDataGet.data.data)
        setEvDetail(EvStationDataGet.data.data)
    }

    const uniqEvStation = (id) => {
        console.log("ev Station Id", id)
        navigation.navigate('EvChargeStation', { evStationId: id })
    }

    const signOut = () => {
        AsyncStorage.clear()
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.signOutDiv}>
                <Text style={styles.signBtn}>Dash Board</Text>
                <Button onPress={signOut} title='Sign Out' />
            </View>

            {userDetail && userDetail.map(ele => {
                return (
                    <View key={ele.id}>
                        {
                            ele.id !== asyncData.id ? null :
                                <View style={styles.profile}>
                                    <Text style={styles.text}>Name : {ele.fname} {ele.lname}</Text>
                                    <Text style={styles.text}>Email : {ele.email}</Text>
                                    <Text style={styles.text}>Phone : {ele.phone}</Text>
                                </View>
                        }
                    </View>
                )
            })}
            <ScrollView>
                {evDetail.map(ele => {
                    return (
                        <View style={styles.hide} key={ele.id}>
                            <Pressable
                                onPress={() => uniqEvStation(ele.id)}
                                android_ripple={{ color: '#fff' }}
                                style={({ pressed }) => [styles.evStationContainer, pressed && styles.btn]}
                            >
                                <Text style={styles.stations}>
                                    {ele.name}
                                </Text>
                            </Pressable>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default DashBoard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30302f',
    },
    signOutDiv: {
        marginTop: 45,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#00FFFFFF'
    },
    signBtn: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },
    profile: {
        borderWidth: 2,
        borderColor: '#ebebe8',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'black',
        opacity: 0.75
    },
    text: {
        color: '#fff'
    },
    hide: {
        overflow: 'hidden',
        borderRadius: 45,
    },
    evStationContainer: {
        borderWidth: 2,
        borderColor: '#ebebe8',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    btn: {
        opacity: 0.5
    },
    stations: {
        color: 'black',
        textAlign: 'center',
        marginVertical: 20
    }
})