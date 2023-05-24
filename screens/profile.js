import React, { useEffect, useState } from 'react';
import { ROUTES } from '../constants/routes';

import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from "@react-navigation/native"


import { baseUrl } from '../constants/url';

export default function Profile(props) {
  const {navigation} = props;
  

    // const { navigation } = props;
    useFocusEffect(
        React.useCallback(() => {
          getUserCatwithBreed();
          getUserInfo();
          // console.log("naload");
          return () => {
            getUserCatwithBreed();
          getUserInfo();
            
            // console.log("umalis");
          };
        }, [])
      );
  
  const clearStorage = () => {
    AsyncStorage.clear().then(() => console.log("Cleared"));
    return navigation.navigate(ROUTES.LOGIN);
  }
  const [user_id, setUserId] = useState("");
  // const [username, setUsername] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [email, setEmail] = useState("");
  const [user_cats, setUserCats] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

  const getUserId = async () => {
    userIdStorage = await AsyncStorage.getItem("id");
    setUserId(userIdStorage);
  };

  // const getUsername = async () => {
  //   usernameStorage = await AsyncStorage.getItem("username");
  //   setUsername(usernameStorage);
  //   // console.log(usernameStorage);
  // };

  const getUserInfo = async () => {
    userIdStorage = await AsyncStorage.getItem("id");
    try {
      const response = await axios.get(
        `${baseUrl}getUserInfo/${userIdStorage}`,
        {}
      );
      if (response.status === 200) {
        setUserDetail(response.data.payload[0])
      } else {
        // setState(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // alert("Invalid Username or Email!");
    }
  };

  const getUserCatwithBreed = async () => {
    userIdStorage = await AsyncStorage.getItem("id");
        // console.log(userIdStorage);
    try {
      const response = await axios.get(
        `${baseUrl}getUserCatwithBreed/${userIdStorage}`,
        {}
      );
      if (response.status === 200) {
        setUserCats(response.data.payload)
        // console.log(response.data.payload);
      } else {
        // setState(false);
        throw new Error("An error has occurred");
      }
    } catch (error) {
      // alert("No Cats!");
    }
  };

  useEffect(() => {
    getUserId();
    // getUsername();
    getUserInfo();
    getUserCatwithBreed();
  }, []);

  return (
      <View style={styles.body_container}>
        <View style={styles.logo_container}>
        
          <Image style={styles.logo} source={require('../assets/icons/navigation/footprint.png')}/>
          <Text style={styles.text}>{userDetail.firstname} {userDetail.lastname} {'\n'} {userDetail.email}</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={clearStorage}><Text style={styles.signouttext}>Log Out</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_PROFILE, userDetail)}>
            <Text style={styles.edittext}>Edit Profile</Text>
          </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.form_container}>
        <View style={styles.details_container}>
              <Text style={styles.text}>CAT LIBRARY:</Text>
              {user_cats.length>0 ? <FlatList
                data={user_cats}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity onPress={()=>{navigation.navigate(ROUTES.CAT_DETAILS, item)}} style={styles.library_button_yellow} >
                      <View style={styles.library_left}>
                          <Image style={styles.library_icon} source={{ uri: item.breed_photo }}/>
                          <Text style={styles.cat_name}>{item.cat_name}</Text>
                      </View>
                      <View style={styles.library_right}>
                          <Text style={styles.see}>Details...</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              /> : 
                <View>
                  <Text style={styles.nocats}>You don't have cats yet </Text>
                </View>
              }
              <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.EDIT)}><Text style={styles.addtext}>+</Text></TouchableOpacity>
          </View >
        </View >
          
      </View>

  );
}

const styles = StyleSheet.create({  
  body_container: {
    flex:1,
    // padding:10,
    // backgroundColor:'#fff',
    backgroundColor:'#1e1e1e',
    width:'100%',
  },

  logo_container: {
    flex:0.45,
    // padding:20,
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  form_container: {
    flex:0.65,
    padding:10,
    backgroundColor:'#ffffff',
    // width:'100%',
    // backgroundColor:'#1e1e1e',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },

  buttonContainer:{
    display: 'flex',
    flexDirection:'row',
  },

  details_container: {
    // flex:1,
    backgroundColor:'#1e1e1e',
    // backgroundColor:'#ffffff',
    width:'100%',
    height:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding: 5,
  },
  
  button_container: {
    padding:10,
    width:'100%',
    alignItems: 'center',
  },

  text: {
    margin:5,
    padding:5,
    textAlign: 'center',
    fontSize:18,
    fontWeight:'bold',
    color: 'white',
  },
  nocats: {
    margin:5,
    marginTop:135,
    marginBottom:140,
    padding:5,
    textAlign: 'center',
    fontSize:18,
    fontWeight:'bold',
    color: 'white',
  },

  addtext: {
    textAlign: 'center',
    fontSize:25,
    fontWeight:'bold',
    color: 'white',
    margin:5,
    backgroundColor:'#27842A',
    width:100,
    borderRadius:30,
  },

  signouttext: {
    textAlign: 'center',
    fontSize:16,
    padding:8,
    fontWeight:'bold',
    color: 'white',
    margin:10,
    backgroundColor:'red',
    width:100,
    borderRadius:30,
  },

  library_button_yellow: {
    margin:5,
    padding:5,
    backgroundColor:'#D2DFE2',
    // width:'100%',
    borderBottomWidth:1,
    borderColor: 'black',
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

  cat_name:{
    // alignItems: 'center',
    // justifyContent: 'center',
    fontWeight:'bold',
    color: '#585353',
    fontSize:15,
  },
  
  see:{
    padding:10,
    // alignItems: 'center',
    color: '#585353',
    // justifyContent: 'center',
  },


  library_right: {
    width:'50%',
    // backgroundColor:'gray',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  library_icon: {
    margin:5,
    width:70,
    height:70,
    borderRadius:70,
    borderColor:'#B13434',
    borderWidth:1,
  },

  edittext: {
    textAlign: 'center',
    fontSize:16,
    padding:8,
    fontWeight:'bold',
    color: 'white',
    margin:10,
    backgroundColor:'green',
    width:150,
    borderRadius:30,
  },
});
