import React, { useEffect, useState } from 'react';
import { ROUTES } from '../constants/routes';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const accounts_list=[
//   {
//     id: "1",
//     account_name: "Bryan",
//     }
//   ];

export default function Home(props) {
  const {navigation} = props;

  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const getUserId = async () => {
    userIdStorage = await AsyncStorage.getItem("id");
    setUserId(userIdStorage);
  };

  const getUsername = async () => {
    usernameStorage = await AsyncStorage.getItem("username");
    setUsername(usernameStorage);
    // console.log(usernameStorage);
  };

  useEffect(() => {
    getUserId();
    getUsername();
  }, []);

  return (
    <View style={styles.main_container}>
      <View style={styles.top_nav_container}>
                <View style={styles.icon_container}>
                  <View><Image style={styles.nav_icon} source={require('../assets/icons/navigation/cat.png')}/></View>
                  <TouchableOpacity><Text style={styles.cat_name}>{username}</Text></TouchableOpacity>
                </View>
        <View style={styles.whistle_container}>
        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.CLICKER)}><Image style={styles.nav_icon} source={require('../assets/icons/navigation/whistle.png')}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.SETTINGS)}><Image style={styles.nav_icon} source={require('../assets/icons/navigation/settings.png')}/></TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>

      <View style={styles.body_container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Games</Text>
            <View style={styles.games_card}>
              <Text style={styles.card_context}>Improve Relationsip with your cat by playing with them</Text>
              <TouchableOpacity style={styles.card_button} onPress={()=>navigation.navigate(ROUTES.GAMES)}><Text style={styles.text}>SEE GAMES</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Articles</Text>
            <View style={styles.articles_card}>
              <Text style={styles.card_context}>Improve Relationsip with your cat by playing with them</Text>
              <Text style={styles.card_details}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <TouchableOpacity style={styles.card_button} onPress={()=>navigation.navigate(ROUTES.ARTICLES)}><Text style={styles.text}>SEE ARTICLES</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
          <Text style={styles.title}>More Cats</Text>
            <View style={styles.morecats_card}>
              <Text style={styles.card_context}>Improve Relationsip with your cat by playing with them</Text>
              <Text style={styles.card_details}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
              <TouchableOpacity style={styles.card_button}><Text style={styles.text} onPress={()=>navigation.navigate(ROUTES.MORE_CATS)}>SEE MORE CATS</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto"/>

    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex:1,
  },

  body_container: {
    flex:1,
    padding:10,
    backgroundColor:'#292929',
    width:'100%', 
  },

  title:{
    fontWeight:'bold',
    fontSize:20,
    color:'white',
  },

  top_nav_container: {
    flex:0.15,
    padding:10,
    backgroundColor:'#D2DFE2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  icon_container: {
    width:'100%',
    height:'100%',
    flex:0.5,
    alignItems: 'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  nav_icon: {
    margin:10,
    width: 50,
    height: 50,
  },
  cat_name: {
    margin:5,
    fontSize:20,
  },

  whistle_container: {
    width:'100%',
    height:'100%',
    flex:0.5,
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  whistle_icon: {
    margin:10,
    width: '28%',
    height: '72%',
  },

  container: {
    marginBottom:10,
    justifyContent: 'center',
  },

  horizontal_container: {
    padding:5,
    display:'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection:'row',
  },
  
  shortcut_container: {
    margin:5,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  shortcut_icon: {
    width:80,
    height:80,
  },

  shortcut_name: {
    fontSize:14,
    color:'white',
  },



  games_card: {
    backgroundColor:'#715217',
    margin:10,
    padding:10,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius:10,
  },

  card_context:{
    textAlign:'center',
    fontWeight:'bold',
    color: 'white',
    fontSize: 20,
    padding:10,
  },
  card_details:{
    textAlign:'center',
    fontWeight:'bold',
    color: 'white',
    fontSize: 14,
    margin:5,
  },

  card_button: {
    margin:10,
    padding:10,
    backgroundColor:'#FFD939',
    width:'70%',
    borderRadius:30,
    alignItems: 'center',
    // justifyContent: 'center',
  },


  articles_card: {
    backgroundColor:'#DD4C39',
    margin:10,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },


  morecats_card: {
    backgroundColor:'#585353',
    margin:10,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
});
