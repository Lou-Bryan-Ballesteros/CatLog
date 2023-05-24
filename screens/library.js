
import { ROUTES } from '../constants/routes';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { baseUrl } from '../constants/url';
import { imgUrl } from '../constants/url';


export default function Library(props) {
  const { navigation } = props;

  const [games_list, setGamesList] = useState([]);
  const [breeds_list, setBreedsList] = useState([]);
  const [user_id, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const getAllGamesShortcut = async () => {
    await axios.get(`${baseUrl}getAllGamesShortcut`)
      .then((response) => setGamesList(response.data.payload))
  };

  const getAllBreedsShortcut = async () => {
    await axios.get(`${baseUrl}getAllBreedsShortcut`)
      .then((response) => setBreedsList(response.data.payload))
  };

  const getUserId = async () => {
    userIdStorage = await AsyncStorage.getItem("id");
    setUserId(userIdStorage);
  };

  const getUsername = async () => {
    usernameStorage = await AsyncStorage.getItem("username");
    setUsername(usernameStorage);
  };

  useEffect(() => {
    getAllGamesShortcut();
    getAllBreedsShortcut();
    getUserId();
    getUsername();
  }, []);

  return (
    <View style={styles.main_container}>
      <View style={styles.top_nav_container}>
        <View style={styles.icon_container}>
          <View>
            <Image style={styles.nav_icon} source={require('../assets/icons/navigation/cat.png')} />
          </View>
          <TouchableOpacity>
            <Text style={styles.cat_name}>{username}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.whistle_container}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.CLICKER)}>
            <Image style={styles.nav_icon} source={require('../assets/icons/navigation/whistle.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.SETTINGS)}>
            <Image style={styles.nav_icon} source={require('../assets/icons/navigation/settings.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body_container}>
        <View>
          <Text style={styles.title}>Library</Text>
          <View style={styles.library_card}>
            <TouchableOpacity style={styles.library_button} onPress={() => navigation.navigate(ROUTES.EXERCISES)}>
              <View style={styles.library_left}>
                <Image style={styles.library_icon} source={require('../assets/icons/toys/whistle.png')} />
                <Text style={styles.text}>EXERCISES</Text>
              </View>
              <View style={styles.library_right}>
                <Text style={styles.see}>See more...</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.library_button} onPress={() => navigation.navigate(ROUTES.GAMES)}>
              <View style={styles.library_left}>
                <Image style={styles.library_icon} source={require('../assets/icons/toys/dog-ball.png')} />
                <Text style={styles.text}>GAMES</Text>
              </View>
              <View style={styles.library_right}>
                <Text style={styles.see}>See more...</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.library_button} onPress={() => navigation.navigate(ROUTES.ARTICLES)}>
              <View style={styles.library_left}>
                <Image style={styles.library_icon} source={require('../assets/icons/interaction/friendship.png')} />
                <Text style={styles.text}>ARTICLES</Text>
              </View>
              <View style={styles.library_right}>
                <Text style={styles.see}>See more...</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.library_button} onPress={() => navigation.navigate(ROUTES.MORE_CATS)}>
              <View style={styles.library_left}>
                <Image style={styles.library_icon} source={require('../assets/icons/toys/black-cat.png')} />
                <Text style={styles.text}>MORE CATS</Text>
              </View>
              <View style={styles.library_right}>
                <Text style={styles.see}>See more...</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.morecats_container}>
          <Text style={styles.title}>Exercises</Text>
          <ScrollView style={styles.horizontal_container} showsHorizontalScrollIndicator={false} horizontal={true}>
            <FlatList
              data={games_list}
              numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity onPress={() => { navigation.navigate(ROUTES.GAMES_INSTRUCTIONS, item) }} style={styles.shortcut_container}>
                    <Image style={styles.shortcut_icon} source={{ uri: imgUrl + item.game_icon }} />
                    <Text key={"game"} style={styles.shortcut_name}>{item.game_name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>

        <View style={styles.morecats_container}>
          <Text style={styles.title}>More Cats</Text>
          <ScrollView style={styles.horizontal_container} showsHorizontalScrollIndicator={false} horizontal={true}>
            <FlatList
                data={breeds_list}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <View>
                    <TouchableOpacity onPress={() => { navigation.navigate(ROUTES.BREED, item) }} style={styles.shortcut_container}>
                      <Image style={styles.shortcut_icon} source={require('../assets/icons/toys/black-cat.png')}  />
                      <Text key={"game"} style={styles.shortcut_name}>{item.breed_name}</Text>
                    </TouchableOpacity>
                  </View>
                )}
            />
          </ScrollView>
        </View>
      </ScrollView>
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
    backgroundColor:'#fff',
    width:'100%', 
  },

  title:{
    fontWeight:'bold',
    fontSize:20,
    // color:'white',
  },

  morecats_container: {
    padding:5,
    marginBottom:10,
    justifyContent: 'center',
  },

  horizontal_container: {
    padding:5,
    flexDirection:'row',
  },
  
  shortcut_container: {
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shortcut_icon: {
    width:80,
    height:80,

  },

  shortcut_name: {
    fontSize:14,
    // color:'white',
  },

  library_card: {
    // backgroundColor:'#715217',
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },

  library_button: {
    margin:5,
    padding:5,
    backgroundColor:'#292929',
    width:'100%',
    borderBottomColor: '#CDCDCD',
    borderBottomWidth:2,
    borderRadius:10,
    flexDirection:'row',
  },
  
  library_left: {
    width:'50%',
    // backgroundColor:'gray',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:'row',
  },

  text:{
    // alignItems: 'center',
    // justifyContent: 'center',
    fontWeight:'bold',
    fontSize:15,
    color: 'white',
  },
  
  see:{
    padding:10,
    // alignItems: 'center',
    // justifyContent: 'center',
    color:'white',
    fontSize:15,

  },

  library_right: {
    width:'50%',
    // backgroundColor:'gray',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  library_icon: {
    margin:5,
    width:50,
    height:50,
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

});
