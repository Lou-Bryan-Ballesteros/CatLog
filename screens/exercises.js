
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { ROUTES } from '../constants/routes';

import { useEffect, useState } from 'react';
import axios from 'axios';

// const baseUrl = 'http://192.168.43.154/CatLog/samplerest/';
import { baseUrl } from '../constants/url';
import { imgUrl } from '../constants/url';


export default function Exercises(props) {
  const {navigation} = props;

  const [exercises_list, setData] = useState([]);
  const getAllExercises = async () => {
    await axios.get(`${baseUrl}getAllExercises`)
        .then((response) => setData(response.data.payload))
  };

  useEffect(() => {
    getAllExercises();
  }, []);

  return (
      <View style={styles.body_container}>
              <FlatList
                data={exercises_list}
                numColumns={4}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                  <View>
                    <TouchableOpacity onPress={()=>{navigation.navigate(ROUTES.EXERCISES_INSTRUCTIONS, item)}} style={styles.shortcut_container}>
                      <Image style={styles.shortcut_icon} source={{uri:imgUrl + item.exercise_icon}}/>
                      <Text style={styles.shortcut_name}>{item.exercise_name}</Text>
                  </TouchableOpacity>
                  </View>
                )}
              />
      </View>
  );
}

const styles = StyleSheet.create({
  body_container: {
    flex:1,
    padding:10,
    backgroundColor:'#292929',
    width:'100%',
    alignItems: 'center',
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
    color:'white',
  },

  title:{
    fontWeight:'bold',
    color:'white',
    fontSize:20,
  },
});
