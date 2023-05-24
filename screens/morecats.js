
import { ROUTES } from '../constants/routes';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants/url';


export default function MoreCats(props) {
  const {navigation} = props;


  const [breeds_list, setData] = useState([]);
  const getAllBreeds = async () => {
    await axios.get(`${baseUrl}getAllBreeds`)
        .then((response) => setData(response.data.payload))
  };

  useEffect(() => {
    getAllBreeds();
  }, []);

  return (
        <View style={styles.body_container}>
              <FlatList
                data={breeds_list}
                keyExtractor={(item) => item.id}
                renderItem={({item, index}) => (
                  <View>
                    <TouchableOpacity style={{
                        backgroundColor: index % 2 === 0 ? '#B13434' : '#FFD939',
                        margin:5,
                        padding:5,
                        borderBottomColor: '#CDCDCD',
                        borderBottomWidth:2,
                        borderRadius:10,
                        flexDirection:'row',
                        }} onPress={()=>{navigation.navigate(ROUTES.BREED, item)}}>
                      <View style={styles.library_left}>
                          <Image style={styles.library_icon} source={{uri:item.breed_photo}}/>
                          <Text style={styles.text_white}>{item.breed_name}</Text>
                      </View>
                      <View style={styles.library_right}>
                          <Text style={styles.see_white}>See more...</Text>
                      </View>
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
  },

  title:{
    fontWeight:'bold',
    fontSize:20,
    color:'white',
  },
  
  library_left: {
    width:'50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:'row',
  },

  text_white:{
    // alignItems: 'center',
    // justifyContent: 'center',
    fontWeight:'bold',
    fontSize:15,
    color: 'white',
  },
  
  see_white:{
    padding:10,
    // alignItems: 'center',
    // justifyContent: 'center',
    color:'white',
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
    borderRadius:10,
  },

});
