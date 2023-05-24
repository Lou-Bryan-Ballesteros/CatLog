import React from 'react';
import { ROUTES } from '../constants/routes';
import { createStackNavigator } from '@react-navigation/stack';
// import BottomTabNavigator from './BottomTabNavigator';
import Profile from '../screens/profile';
import Games from '../screens/games';
import Articles from '../screens/articles';
import MoreCats from '../screens/morecats';
import Clicker from '../screens/clicker';
import Settings from '../screens/settings';
import Home from '../screens/home';
import Exercises from '../screens/exercises';

import Breed from '../screens/breed';
import Topic from '../screens/topic';
import ExercisesInstructions from '../screens/exercisesinstructions';
import GamesInstructions from '../screens/gamesinstructions';
// import LogIn from '../screens/login';


const Stack = createStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={ROUTES.HOME} component={Home} options={{headerShown: false}}/>
            
            {/* TOP NAV */}
            <Stack.Screen name={ROUTES.PROFILE} component={Profile}/>
            <Stack.Screen name={ROUTES.CLICKER} component={Clicker}  options={{ title: 'Back' }}/>
            <Stack.Screen name={ROUTES.SETTINGS} component={Settings}  options={{ title: 'Back' }}/>

            {/* CONTENT */}
            <Stack.Screen name={ROUTES.EXERCISES} component={Exercises}  options={{ title: 'Exercises' }}/>
            <Stack.Screen name={ROUTES.GAMES} component={Games}  options={{ title: 'Games' }}/>
            <Stack.Screen name={ROUTES.ARTICLES} component={Articles}  options={{ title: 'Articles' }}/>
            <Stack.Screen name={ROUTES.MORE_CATS} component={MoreCats}  options={{ title: 'More Cats' }}/>

            {/* SUB CONTENT */}
            <Stack.Screen name={ROUTES.BREED} component={Breed}  options={{ title: 'Back' }}/>
            <Stack.Screen name={ROUTES.TOPIC} component={Topic}  options={{ title: 'Back' }}/>
            <Stack.Screen name={ROUTES.EXERCISES_INSTRUCTIONS} component={ExercisesInstructions} options={{ title: 'Back' }}/>
            <Stack.Screen name={ROUTES.GAMES_INSTRUCTIONS} component={GamesInstructions} options={{ title: 'Back' }}/>
        </Stack.Navigator>
    );
  }