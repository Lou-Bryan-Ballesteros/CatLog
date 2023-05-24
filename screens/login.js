import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ROUTES } from '../constants/routes';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

import { baseUrl } from '../constants/url';

export default function LogIn(props) {
  const {navigation} = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onSubmitFormHandler = async (event) => {
    if (!username.trim() || !password.trim()) {
      alert("Input your Username and Password!");
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}login`, {
        username:username, 
        password:password,
      });
      if (response.status === 200) {
        // console.log(response.data.payload);
        alert("Login Successful!");

        storeData = async () => {
          try {
            // await AsyncStorage.setItem("bio", response.data.payload.bio);
            await AsyncStorage.setItem(
              "id",
              JSON.stringify(response.data.payload.id)
            );
            await AsyncStorage.setItem(
              "username",
              response.data.payload.username
            );
            await AsyncStorage.setItem(
              "firstname",
              response.data.payload.firstname
            );
            await AsyncStorage.setItem(
              "lastname",
              response.data.payload.lastname
            );
            // await AsyncStorage.setItem("token", response.data.payload.token);
          } catch (error) {
            // Error saving data
          }
        };
        storeData();
        return navigation.navigate(ROUTES.BOTTOM_TAB_NAVIGATOR);
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("Invalid Username or Email!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}><Image style={styles.logo} source={require('../assets/logo/catloglogo.png')}/></View>
      <Text style={styles.welcome}>WELCOME!</Text>
      
      <View style={styles.form_container}>

        <View style={styles.input_container}>
          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={onChangeUsernameHandler}/>
          <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" value={password} onChangeText={onChangePasswordHandler}/>
          <TouchableOpacity style={styles.login_button} onPress={onSubmitFormHandler}><Text style={styles.text}>LOGIN</Text></TouchableOpacity>
          
        </View>
        <Text style={styles.forgot}>Don't have an account?</Text>
          <TouchableOpacity style={styles.facebook_button} onPress={()=>navigation.navigate(ROUTES.REGISTER)}><Text style={styles.continue_text}>SIGN UP</Text></TouchableOpacity>
        {/* <View style={styles.button_container}>
          <TouchableOpacity style={styles.google_button}><Text style={styles.continue_text}>CONTINUE WITH GOOGLE</Text></TouchableOpacity>
          <TouchableOpacity style={styles.facebook_button}><Text style={styles.continue_text}>CONTINUE WITH FACEBOOK</Text></TouchableOpacity>
        </View> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2DFE2' ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_container: {
    width:'100%',
    height:'100%',
    flex:0.43,
    padding:10,
    margin:10,
    // borderColor:'black',
    // borderWidth:1,
    // backgroundColor:'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 240,
    height: 250,
  },
  form_container: {
    flex:0.57,
    padding:10,
    // borderColor:'black',
    // borderWidth:1,
    backgroundColor:'#1e1e1e',
    width:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin:5,
    padding:15,
    borderColor:'#CDCDCD',
    borderWidth:1,
    backgroundColor:'#D2E2E2',
    width:'90%',
    height:50,
    borderRadius:30,
  },
  input_container: {
    // flex:0.6,
    padding:10,
    margin:10,
    // borderColor:'black',
    // borderWidth:1,
    // backgroundColor:'gray',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_container: {
    // flex:0.4,
    padding:10,
    // borderColor:'black',
    // borderWidth:1,
    // backgroundColor:'gray',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  google_button: {
    margin:5,
    padding:15,
    backgroundColor:'#DD4C39',
    width:'90%',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
    color:'white',
  },
  facebook_button: {
    margin:5,
    padding:15,
    backgroundColor:'#3A5999',
    width:'50%',
    color:'white',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
  },
  login_button: {
    margin:5,
    padding:15,
    borderColor:'#FFD939',
    borderWidth:1,
    backgroundColor:'#FFD939',
    width:'75%',
    borderRadius:30,
  },
  text: {
    textAlign: 'center',
    fontSize:16,
    fontWeight:'bold',
  },
  continue_text: {
    textAlign: 'center',
    fontSize:16,
    fontWeight:'bold',
    color: 'white',
  },
  forgot:{
    color: '#9B9B9B',
    fontSize:14,
  },

  welcome:{
    color: '#9B9B9B',
    marginBottom:-10,
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    fontSize:20,
    fontWeight: 'bold',
    backgroundColor:'#1e1e1e',
  },
});
