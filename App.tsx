import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import DriverAForm from './screens/DriverAForm';
import DriverBForm from './screens/DriverBForm';
import DamageDetails from './screens/DamageDetails';
import ProtocolList from './screens/ProtocolList';
import ProtocolDetails from './screens/ProtocolDetails';
import { RootStackParamList } from './screens/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Головна' }}
        />
        <Stack.Screen 
          name="DriverAForm" 
          component={DriverAForm} 
          options={{ title: 'Водій А' }}
        />
        <Stack.Screen 
          name="DriverBForm" 
          component={DriverBForm} 
          options={{ title: 'Водій Б' }}
        />
        <Stack.Screen 
          name="DamageDetails" 
          component={DamageDetails} 
          options={{ title: 'Пошкодження' }}
        />
        <Stack.Screen 
          name="ProtocolList" 
          component={ProtocolList} 
          options={{ title: 'Мої протоколи' }}
        />
        <Stack.Screen 
          name="ProtocolDetails" 
          component={ProtocolDetails} 
          options={{ title: 'Деталі протоколу' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}