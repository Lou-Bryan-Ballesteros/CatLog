import React from 'react';
import { ROUTES } from '../constants/routes';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

import HomeStackNavigator from './HomeStackNavigator';
import LibraryStackNavigator from './LibraryStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({route}) => ({
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              display: 'flex',
              backgroundColor: '#d2dfe2',
              height: 60,
              borderTopWidth: 0,
              elevation: 40
            },
            tabBarShowLabel: false,
            headerShown: false,
          })}>
          <Tab.Screen name={ROUTES.HOME_STACK_NAVIGATOR} component={HomeStackNavigator}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 10 : 0,
                }}>
                <Icon
                  name= 'home'
                  size={28}
                  color={focused ? '#d48b07' : '#393939'}
                />
              </View>
            ),
          }}/>
          <Tab.Screen name={ROUTES.LIBRARY_STACK_NAVIGATOR} component={LibraryStackNavigator} options={{
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}>
                    <Icon
                      name="search"
                      size={28}
                      color={focused ? '#d48b07' : '#393939'}
                    />
                  </View>
                ),
              }}/>
          <Tab.Screen name={ROUTES.PROFILE_STACK_NAVIGATOR} component={ProfileStackNavigator} options={{
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      top: Platform.OS === 'ios' ? 10 : 0,
                    }}>
                    <Icon
                      name="paw"
                      size={28}
                      color={focused ? '#d48b07' : '#393939'}
                    />
                  </View>
                ),
              }}/>
        </Tab.Navigator>
      );
}
