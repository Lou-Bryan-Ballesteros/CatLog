import React from 'react';
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/profile';
import Edit from '../screens/edit';
import CatDetails from '../screens/catdetails';
import EditDetails from '../screens/editdetails';
import EditProfile from '../screens/editprofile';
// import LogIn from '../screens/login';


const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.PROFILE} component={Profile} options={{headerShown: false}}/>
            
            {/* CONTENT */}
            <Stack.Screen name={ROUTES.EDIT} component={Edit} options={{ title: 'New Cat' }}/>
            <Stack.Screen name={ROUTES.EDIT_DETAILS} component={EditDetails} options={{ title: 'Back' }}/>
            <Stack.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} options={{ title: 'Edit Profile' }}/>
            <Stack.Screen name={ROUTES.CAT_DETAILS} component={CatDetails} options={{ title: 'My Cat Details' }}/>
            {/* TOP NAV */}
            {/* <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
            <Stack.Screen name={ROUTES.CLICKER} component={Clicker}/>
            <Stack.Screen name={ROUTES.SETTINGS} component={Settings}/> */}

            
        </Stack.Navigator>
    );
  }