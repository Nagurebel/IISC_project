import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'

const VehicleCharge = ({ route, navigation }) => {

    const { amount, evStationId } = route.params
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(false)


    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setCount((prevCount) => {
                    const newCount = prevCount + 1;
                    if (newCount >= amount) {
                        setIsActive(false); // Stop the countdown
                        Alert.alert(
                            'Charing Completed', 'Thank you Have a Good Day',
                            [
                                { text: 'Ok', onPress: () => navigation.navigate('EvChargeStation', { evStationId: evStationId }) }
                            ]
                        )
                        setCount(200)
                    }
                    return newCount
                });
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [isActive]);

    const handleStart = () => {
        // setCount(10); // Set initial countdown value
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };

    return (
        <View style={styles.container}>

            <Text>Vehicle Charge Price {amount}</Text>
            <Text>Charging: {count}</Text>

            {isActive ? null : <Button title="Start" onPress={handleStart} />}
            {isActive ? <Button title="Stop" onPress={handleStop} /> : null}

        </View>
    )
}

export default VehicleCharge

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})