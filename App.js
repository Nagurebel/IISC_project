import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './component/Login';
import Registration from './component/Registration';
import DashBoard from './component/DashBoard';
import EvChargeStation from './component/EvChargeStation';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import VehicleCharge from './component/VehicleCharge';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" barStyle="light-content" backgroundColor='black' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}
            options={{
              headerTitle: 'User Login',
              headerTitleAlign: 'center', headerStyle: {
                backgroundColor: '#00FFFFFF'
              }
            }}
          />
          <Stack.Screen name="Registration" component={Registration}
            options={{
              headerTitle: 'Sign Up',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#00FFFFFF'
              }
            }}
          />
          <Stack.Screen name="DashBoard" component={DashBoard}
            options={{
              headerShown: false
              // headerTitle: 'Dash Board',
              // headerTitleAlign: 'center',
              // headerStyle: {
              //   backgroundColor: '#00FFFFFF'
              // }
            }}
          />
          <Stack.Screen name="EvChargeStation" component={EvChargeStation}
            options={{
              headerTitle: 'Charge Stations',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#00FFFFFF'
              }
            }}
          />
          <Stack.Screen name="VehicleCharge" component={VehicleCharge}
            options={{
              headerTitle: 'Vehicle Charging',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#00FFFFFF'
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

