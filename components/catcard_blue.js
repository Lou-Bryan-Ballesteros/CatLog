
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

export default function Blue() {
  return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.library_button_yellow}>
                <View style={styles.library_left}>
                    <Image style={styles.library_icon} source={require('../assets//icons/interaction/friendship.png')}/>
                    <Text style={styles.text}>ARTICLES TITLE</Text>
                </View>
                <View style={styles.library_right}>
                    <Text style={styles.see}>See more...</Text>
                </View>
            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#D2DFE2' ,
    alignItems: 'center',
    justifyContent: 'center',
  },

  library_button_yellow: {
    margin:5,
    padding:5,
    backgroundColor:'#3A5999',
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
    color: '#ffffff',
    fontSize:15,
  },
  
  see:{
    padding:10,
    // alignItems: 'center',
    color: '#ffffff',
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
    borderRadius:10,
  },
});
