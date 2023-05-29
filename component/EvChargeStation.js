import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios';
import DropDownPicker from "react-native-dropdown-picker";

import ApiURL from '../ApiURL';

const EvChargeStation = ({ route, navigation }) => {

    const { evStationId } = route.params;
    const [evStation, setEvstation] = useState({})

    const [vehiclewheelerOpen, setVehiclewheelerOpen] = useState(false);
    const [vehicleWheelerValue, setVehicleWheelerValue] = useState(null);
    const [vehicle, setVehicle] = useState([
        { label: "2 - Wheeler", value: "2 - Wheeler" },
        { label: "3 - Wheeler", value: "3 - Wheeler" },
        { label: "4 - Wheeler", value: "4 - Wheeler" },
    ]);

    const onVehicleSelecterOpen = useCallback(() => {
        setVehiclewheelerOpen(true);
    }, []);

    useEffect(() => {
        evStationList()
    }, [])

    const evStationList = async () => {
        let data = await axios.get(`${ApiURL}evstation/${evStationId}`)
        console.log("loginPost", data.data.data)
        setEvstation(data.data.data)
    }

    console.log("vehicleWheelerValue", vehicleWheelerValue)

    const payment = () => {
        if (vehicleWheelerValue === '2 - Wheeler') {
            Alert.alert('Payment', `${vehicleWheelerValue} 100`,
                [
                    { text: 'Cancel', onPress: () => console.warn('Cancel Pressed!') },
                    { text: 'Ok', onPress: () => navigation.navigate('VehicleCharge', { amount: 100, evStationId: evStationId }) }
                ])
        } else if (vehicleWheelerValue === '3 - Wheeler') {
            Alert.alert('Payment', `${vehicleWheelerValue} 200`,
                [
                    { text: 'Cancel', onPress: () => console.warn('Cancel Pressed!') },
                    { text: 'Ok', onPress: () => navigation.navigate('VehicleCharge', { amount: 200, evStationId: evStationId }) }
                ])
        } else {
            Alert.alert('Payment', `${vehicleWheelerValue} 400`,
                [
                    { text: 'Cancel', onPress: () => console.warn('Cancel Pressed!') },
                    { text: 'Ok', onPress: () => navigation.navigate('VehicleCharge', { amount: 400, evStationId: evStationId }) }
                ]
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.stationDiv}>
                <View style={styles.station}>
                    <Text style={styles.title}>Station name : </Text>
                    <Text style={styles.text}>{evStation.name}</Text>
                </View>
                <View style={styles.station}>
                    <Text style={styles.title}>Address : </Text>
                    <Text style={styles.text}>{evStation.address}</Text>
                </View>
                <View style={styles.station}>
                    <Text style={styles.title}>Charger Type : </Text>
                    <Text style={styles.text}>{evStation.chargingType}</Text>
                </View>
                <View style={styles.station}>
                    <Text style={styles.title}>Capacity : </Text>
                    <Text style={styles.text}>{evStation.capacity}</Text>
                </View>
            </View>
            <View style={styles.dropdownVehicle}>

                {vehicleWheelerValue !== null && <Text style={styles.select}>{vehicleWheelerValue}</Text>}

                <DropDownPicker
                    style={styles.dropdown}
                    open={vehiclewheelerOpen}
                    value={vehicleWheelerValue} //genderValue
                    items={vehicle}
                    setOpen={setVehiclewheelerOpen}
                    setValue={setVehicleWheelerValue}
                    setItems={setVehicle}
                    placeholder="Select Vehicle type"
                    placeholderStyle={styles.placeholderStyles}
                    onOpen={onVehicleSelecterOpen}
                    zIndex={3000}
                    zIndexInverse={1000}
                />

            </View>
            <View style={styles.btn}>
                <Button onPress={payment} title='Payment' />
            </View>
        </View>
    )
}

export default EvChargeStation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#30302f'
    },
    stationDiv: {
        marginTop: 50,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        padding: 20,
        borderRadius: 20
    },
    station: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    select: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    dropdownVehicle: {
        marginHorizontal: 50,
        width: "80%",
        marginVertical: 20,
    },
    dropdown: {
        borderColor: "#B7B7B7",
        height: 50,
        marginVertical: 10,
    },
    placeholderStyles: {
        color: "grey",
    },
    text: {
        fontSize: 16,
        color: '#5e5e5c',
        fontWeight: '500'
    },
    btn: {
        marginTop: 100,
        marginHorizontal: 60,
    }
})