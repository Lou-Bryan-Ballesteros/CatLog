
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';


export default function Clicker() {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playSound = async () => {
    try {
      // console.log('loading');
      const { sound: soundObject } = await Audio.Sound.createAsync(require('../assets/clickersound.mp3'));
      setSound(soundObject);
      await soundObject.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  return (
      <View style={styles.main_container}>
        <ScrollView style={styles.body_container}>
          <View style={styles.library_container}>
            
            <View style={styles.library_card}>
            <Text style={styles.clickertitle}>CLICKER TRAINER</Text>
            <Text style={styles.description}>TAP THE CLICKER TO HEAR THE CLICK SOUND!</Text>
              {/* <Sound/> */}
              <TouchableOpacity onPress={playSound}>
                <Image style={styles.icon} source={require('../assets/icons/toys/whistle.png')}/>
              </TouchableOpacity>
              <Text style={styles.title}>CLICK ME!</Text>
            </View>
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
    backgroundColor:'#292929',
    width:'100%', 
  },

  library_container: {
    marginBottom:10,
    justifyContent: 'center',
  },

  library_card: {
    padding:10,
    alignItems: 'center',
    borderRadius:10,
  },

  title:{
    padding:15,
    backgroundColor:'#3A5999',
    width:'50%',
    color:'white',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
    fontSize:20,
    color:'#D2DFE2',
  },

  clickertitle:{
    margin:5,
    padding:15,
    backgroundColor:'#FFD939',
    width:'80%',
    color:'black',
    textAlign: 'center',
    borderRadius:30,
    fontWeight:'bold',
    fontSize:20,
  },

  description:{
    fontWeight:'bold',
    fontSize:16,
    color:'#D2DFE2',
    textAlign:'center',
  },

  icon:{
    width:300,
    height:300,
    margin:40,
  }

});
