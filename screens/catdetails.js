import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ROUTES } from '../constants/routes';
import { useFocusEffect } from "@react-navigation/native"
import axios from 'axios';

import { baseUrl } from '../constants/url';


export default function CatDetails({ route, navigation}) {
    // const catDetail = '';
    const [catDetail, setCatDetail] = useState("");
    // const { navigation } = props;
    useFocusEffect(
        React.useCallback(() => {
            // catDetail = route.params;
            setCatDetail(route.params);
          // console.log("naload");
          return () => {
            // catDetail = route.params;
            setCatDetail(route.params);
            // console.log("umalis");
          };
        }, [])
      );

      const deleteButton = async () => {
        try {
          console.log("Deleting cat:", catDetail);
          const response = await axios.post(`${baseUrl}deleteCat/${catDetail.id}`, {
            // id: catDetail.id,
          });
          console.log("Delete response:", response);
          if (response.status === 200) {
            alert('Successfully deleted the cat!');
            return navigation.navigate(ROUTES.PROFILE);
          } else {
            throw new Error("An error has occurred");
          }
        } catch (error) {
          alert(error);
        }
      };

  return (
    
    <View style={styles.mainContainer}>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.breedsCard}>
          <Image style={styles.image} source={{ uri: catDetail.breed_photo }} />
          {/* <View style={styles.titleContainer}>
            <Text style={styles.breedTitle}>{catDetail.cat_name}</Text>
          </View> */}
          <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={deleteButton}>
            <Text style={styles.deletetext}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.EDIT_DETAILS, catDetail)}>
            <Text style={styles.edittext}>Edit</Text>
          </TouchableOpacity>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.breedTitle}>{catDetail.cat_name}</Text>
          </View>
          <View style={styles.breedRow}>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Gender</Text>
              <Text style={styles.breedMark}>{catDetail.cat_gender}</Text>
            </View>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Birthdate</Text>
              <Text style={styles.breedMark}>{catDetail.cat_birthdate}</Text>
            </View>
          </View>
          <View style={styles.breedRow}>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Breed</Text>
              <Text style={styles.breedMark}>{catDetail.breed_name}</Text>
            </View>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Hypoallergenic</Text>
              <Text style={styles.breedMark}>{catDetail.breed_hypo}</Text>
            </View>
          </View>
          <View style={styles.breedDetails}>
            <Text style={styles.detailsTitle}>Shedding</Text>
            <Text style={styles.breedContext}>{catDetail.breed_shed}</Text>
          </View>
          <View style={styles.breedDetails}>
              <Text style={styles.detailsTitle}>Temperament</Text>
              <Text style={styles.breedContext}>{catDetail.breed_temperament}</Text>
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#292929',
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    marginBottom: 10,
  },
  breedTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },

  buttonContainer:{
    flex: 1,
    flexDirection:'row',
  },

  breedsCard: {
    backgroundColor: '#D9D9D9',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  breedDetails: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },

  catName: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems:'center',
  },

  breedContext: {
    fontSize: 16,
    padding: 10,
  },

  edittext: {
    textAlign: 'center',
    fontSize:16,
    padding:5,
    fontWeight:'bold',
    color: 'white',
    margin:10,
    backgroundColor:'green',
    width:100,
    borderRadius:30,
  },
  
  deletetext: {
    textAlign: 'center',
    fontSize:16,
    padding:5,
    fontWeight:'bold',
    color: 'white',
    margin:10,
    backgroundColor: '#DD4C39',
    width:100,
    borderRadius:30,
  },

  detailsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    fontSize: 20,
    padding: 10,
    backgroundColor: '#ba0082',
    borderWidth: 1,
    borderColor: 'white',
  },
  breedRow: {
    flexDirection: 'row',
  },
  breedColumn: {
    width: '50%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  breedMark: {
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
});
