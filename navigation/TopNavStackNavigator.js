import React from 'react';
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/profile';
import Clicker from '../screens/clicker';
import Settings from '../screens/settings';
// import LogIn from '../screens/login';


const Stack = createStackNavigator();

export default function TopNavStackNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        > 
            {/* TOP NAV */}
            <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
            <Stack.Screen name={ROUTES.CLICKER} component={Clicker}/>
            <Stack.Screen name={ROUTES.SETTINGS} component={Settings}/>
        </Stack.Navigator>
    );
  }