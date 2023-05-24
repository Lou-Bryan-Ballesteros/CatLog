import React from 'react';
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import LogIn from '../screens/login';
import Register from '../screens/register';


const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={ROUTES.LOGIN}  
        >
            <Stack.Screen name={ROUTES.LOGIN} component={LogIn}/>
            <Stack.Screen name={ROUTES.REGISTER} component={Register}/>
            <Stack.Screen name={ROUTES.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator}/>
            {/* <Stack.Screen/Signup> */}
        </Stack.Navigator>
    );
  }