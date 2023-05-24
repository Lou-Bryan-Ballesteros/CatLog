
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ROUTES } from '../constants/routes';
import axios from 'axios';
import { useState } from 'react';

import { baseUrl } from '../constants/url';


export default function Register(props) {
  const {navigation} = props;


  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const onChangeFirstNameHandler = (firstname) => {
    setFirstname(firstname);
  };

  const onChangeLastNameHandler = (lastname) => {
    setLastname(lastname);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangeUsernameHandler = (username) => {
    setUsername(username);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeConfirmPasswordHandler = (confirmpassword) => {
    setConfirmpassword(confirmpassword);
  };

  const onSubmitFormHandler = async (event) => {
    if (
      !firstname.trim()|| 
      !lastname.trim()|| 
      !email.trim()|| 
      !username.trim()|| 
      !password.trim()|| 
      !confirmpassword.trim()
    ) {
      alert("Please provide all information!");
      return;
    } else if (password.length < 8) {
      alert("Password should be at least 8 characters!");
      return;
    } else {
      if (password !== confirmpassword) {
        alert("Password doesn't match with Confirm Password!");
        return;
      }

      try {
        const response = await axios.post(`${baseUrl}register`, {
          firstname,
          lastname,
          email,
          username,
          password,
        });
        if (response.status === 200) {
          alert( 'You have succesfully created an account!');
          setFirstname("");
          setLastname("");
          setEmail("");
          setUsername("");
          setPassword("");
          return navigation.navigate(ROUTES.LOGIN);
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
        
        <View style={styles.logo_container}><Image style={styles.logo} source={require('../assets/logo/catloglogo.png')}/></View>
        
        <View style={styles.form_container}>
            <View style={styles.details_container}>
              <Text style={styles.text}>ENTER CREDENTIALS:</Text>
            <ScrollView>
            <View style={styles.input_container}>
              <TextInput style={styles.input} placeholder="Firstname" value={firstname} onChangeText={onChangeFirstNameHandler}/>
              <TextInput style={styles.input} placeholder="Lastname" value={lastname} onChangeText={onChangeLastNameHandler}/>
              <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={onChangeEmailHandler}/>
              <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={onChangeUsernameHandler}/>
              <TextInput style={styles.input} secureTextEntry={true} placeholder="Password" value={password} onChangeText={onChangePasswordHandler}/>
              <TextInput style={styles.input} secureTextEntry={true} placeholder="Confirm Password" value={confirmpassword} onChangeText={onChangeConfirmPasswordHandler}/>
            </View>
            <View style={styles.button_container}>
              <View style={styles.delete_container}>
              <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.LOGIN)}><Text style={styles.delete_button}>CANCEL</Text></TouchableOpacity>
              </View>
              <View style={styles.save_container}>
              <TouchableOpacity onPress={onSubmitFormHandler}><Text style={styles.save_button}>SUBMIT</Text></TouchableOpacity>
              </View>
            </View>
            </ScrollView>
          </View >
        </View >
        
      </View>

  );
}

const styles = StyleSheet.create({
  body_container: {
    flex: 1,
    backgroundColor: '#D2DFE2' ,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo_container: {
    flex:0.3,
    padding:10,
    margin:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 190,
    height: 200,
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
    padding:15,
    flex:0.5,
    backgroundColor:'#DD4C39',
    width:'100%',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
    color:'white',
  },

  save_button: {
    flex:0.5,
    padding:15,
    backgroundColor:'#27842A',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
    color:'white',
  },

});
