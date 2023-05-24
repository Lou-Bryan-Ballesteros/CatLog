import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { ROUTES } from '../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"
import DropDownPicker from 'react-native-dropdown-picker';


import { baseUrl } from '../constants/url';

export default function EditDetails({navigation, route}) {
  const [open_gender, setOpenGender] = useState(false);
  const [open_breed, setOpenBreed] = useState(false);
  // const [value, setValue] = useState(null);
  const [breeds_list, setData] = useState([]);
  const getAllBreeds = async () => {
      await axios.get(`${baseUrl}getAllBreeds`)
          .then((response) => {
              const breedNames = response.data.payload.map((breed) => breed.breed_name);
              setData(breedNames);
              // console.log(breedNames);
          });
  };

  const breedItems = breeds_list.map((breed, index) => ({
    label: breed,
    value: breed,
    key: index.toString(), // or use a unique identifier for each breed
  }));

//   const gender_list = [
//   { label: 'Male', value: 'Male' },
//   { label: 'Female', value: 'Female' },
// ];

const [genders, setGenderList] = useState([
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
]);

  useEffect(() => {
      getAllBreeds();
  }, []);


    const [catDetail, setCatDetail] = useState(route.params);
    // const { navigation } = props;
    useFocusEffect(
        React.useCallback(() => {
            // catDetail = route.params;
            setCatDetail(route.params);
            // console.log(catDetail);
        return () => {
            // catDetail = route.params;
            setCatDetail(route.params);
            // console.log("umalis");
        };
        }, [])
    );


  const [cat_name, setCatName] = useState(catDetail.cat_name);
  const [cat_gender, setCatGender] = useState(catDetail.cat_gender);
  const [cat_breed, setCatBreed] = useState(catDetail.cat_breed);
  const [cat_birthdate, setCatBirthdate] = useState(catDetail.cat_birthdate);
  const [user_id, setUserId] = useState("");

  AsyncStorage.getItem("id").then((value) => setUserId(value));

  const onChangeCatNameHandler = (cat_name) => {
    setCatName(cat_name);
  };

  const onChangeCatGenderHandler = (cat_gender) => {
    setCatGender(cat_gender);
  };

  const onChangeCatBreedHandler = (cat_breed) => {
    setCatBreed(cat_breed);
  };

  const onChangeCatBirthdateHandler = (cat_birthdate) => {
    setCatBirthdate(cat_birthdate);
  };
  const onSubmitFormHandler = async (event) => {
    if (
      !cat_name.trim()|| 
      !cat_gender.trim()|| 
      !cat_breed.trim()|| 
      !cat_birthdate.trim()
    ) {
      alert("Please provide all information!");
      return;
    } else {
      try {
        const response = await axios.post(`${baseUrl}updateCat`, {
        //   user_id: user_id,
          id: catDetail.id,
          cat_name,
          cat_gender,
          cat_breed,
          cat_birthdate,
        });
        if (response.status === 200) {
          alert( 'Successfully Updated Your Cat!');
          setCatName("");
          setCatGender("");
          setCatBreed("");
          setCatBirthdate("");
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
        <Text style={styles.text}>{cat_name}'s Profile:</Text>
        <View style={styles.input_container}>
          <TextInput style={styles.input} placeholder="Cat Name" value={cat_name} onChangeText={onChangeCatNameHandler} />
          <View style={styles.dropdown_container}>
            <DropDownPicker
            // searchable={true}
              open={open_gender}
              value={cat_gender}
              items={genders}
              setOpen={setOpenGender}
              setValue={setCatGender}
              setItems={setGenderList}
              onChangeText={onChangeCatGenderHandler}
              dropDownContainerStyle={styles.dropdown_container_style}
              style={styles.dropdown} // Add this style
            />
          </View>
          {/* <TextInput style={styles.input} placeholder="Breed" value={cat_breed} onChangeText={onChangeCatBreedHandler} /> */}
          <View style={styles.dropdown_container}>
            <DropDownPicker
            searchable={true}
              open={open_breed}
              value={cat_breed}
              items={breedItems}
              setOpen={setOpenBreed}
              setValue={setCatBreed}
              setItems={setData}
              onChangeText={onChangeCatBreedHandler}
              dropDownContainerStyle={styles.dropdown_container_style}
              style={styles.dropdown} // Add this style
            />
          </View>
          <TextInput style={styles.input} placeholder="Date of Birth YYYY-MM-DD" value={cat_birthdate} onChangeText={onChangeCatBirthdateHandler} />
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
    flex:0.25,
    padding:10,
    margin:30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  form_container: {
    flex:0.75,
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
