import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ROUTES } from '../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"



import { baseUrl } from '../constants/url';

export default function EditProfile({navigation, route}) {
    const [userDetail, setUserDetail] = useState(route.params);
    // const { navigation } = props;
    useFocusEffect(
        React.useCallback(() => {
            // catDetail = route.params;
            setUserDetail(route.params);
            // console.log(userDetail);
        return () => {
            // catDetail = route.params;
            setUserDetail(route.params);
            // console.log("umalis");
        };
        }, [])
    );


  const [user_fname, setFirstname] = useState(userDetail.firstname);
  const [user_lname, setLastname] = useState(userDetail.lastname);
  const [user_email, setEmail] = useState(userDetail.email);
  const [user_username, setUsername] = useState(userDetail.username);
  const [user_id, setUserId] = useState("");

  AsyncStorage.getItem("id").then((value) => setUserId(value));

  const onChangeFirstNameHandler = (user_fname) => {
    setFirstname(user_fname);
  };

  const onChangeLastNameHandler = (user_lname) => {
    setLastname(user_lname);
  };

  const onChangeEmailHandler = (user_email) => {
    setEmail(user_email);
  };

  const onChangeUsernameHandler = (user_username) => {
    setUsername(user_username);
  };
  const onSubmitFormHandler = async (event) => {
    if (
      !user_fname.trim()|| 
      !user_lname.trim()|| 
      !user_email.trim()|| 
      !user_username.trim()
    ) {
      alert("Please provide all information!");
      return;
    } else {
      try {
        const response = await axios.post(`${baseUrl}updateProfile`, {
        //   user_id: user_id,
          id: userDetail.id,
          firstname: user_fname,
          lastname: user_lname,
          email: user_email,
          username: user_username,
        });
        if (response.status === 200) {
          alert( 'Successfully Updated Your Profile!');
          setFirstname("");
          setLastname("");
          setEmail("");
          setUsername("");
          return navigation.navigate(ROUTES.PROFILE);
        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert(error);
      }
    }
  };
  


  return (
    <View style={styles.body_container}>
    <View style={styles.logo_container}>
      <Image style={styles.logo} source={require('../assets/icons/navigation/cat.png')} />
    </View>

    <View style={styles.form_container}>
      <View style={styles.details_container}>
        <Text style={styles.text}>DETAILS:</Text>
        <View style={styles.input_container}>
          <TextInput style={styles.input} placeholder="First Name" value={user_fname} onChangeText={onChangeFirstNameHandler} />
          <TextInput style={styles.input} placeholder="Last Name" value={user_lname} onChangeText={onChangeLastNameHandler} />
          <TextInput style={styles.input} placeholder="Email" value={user_email} onChangeText={onChangeEmailHandler} />
          <TextInput style={styles.input} placeholder="Username" value={user_username} onChangeText={onChangeUsernameHandler} />
        </View>
        <View style={styles.button_container}>
          <TouchableOpacity style={styles.delete_button} onPress={() => navigation.navigate(ROUTES.PROFILE)}>
            <Text style={styles.button_text}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.save_button} onPress={onSubmitFormHandler}>
            <Text style={styles.button_text}>SAVE</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  body_container: {
    flex:1,
    backgroundColor:'#292929',
  },

  logo_container: {
    flex:0.3,
    padding:10,
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  form_container: {
    flex:0.7,
    padding:10,
    backgroundColor:'#ffffff',
    // width:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },

  details_container: {
    flex:1,
    backgroundColor:'#1e1e1e',
    // width:'100%',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },

  dropdown_container: {
    zIndex: 9999, // Add this property
    
    // marginTop: 10, // Adjust the margin as needed
  },

  dropdown_container_style: {
    marginTop: -200, // Adjust the value to move the dropdown up
  },
  
  input_container: {
    padding:10,
    // width:'100%',
    alignItems: 'center',
  },

  text: {
    margin:5,
    padding:5,
    textAlign: 'center',
    fontSize:20,
    fontWeight:'bold',
    color: 'white',
  },
  button_container: {
    flexDirection:'row',
    padding:10,
    width:'100%',
    // justifyContent: 'center',
  },
  input: {
    margin:5,
    padding:10,
    fontSize:16,
    borderColor:'#CDCDCD',
    backgroundColor:'#565358',
    width:'100%',
    // height:50,
    borderRadius:10,
    color:'white',
  },

  delete_container:{
    width:'40%',
    padding:5,
  },

  save_container:{
    width:'60%',
    padding:5,
  },

  delete_button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#DD4C39',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  
  save_button: {
    flex: 1,
    padding: 15,
    backgroundColor: '#27842A',
    borderRadius: 30,
    marginHorizontal: 5,
  },
  
  button_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },

});
