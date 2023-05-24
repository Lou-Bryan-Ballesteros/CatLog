
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';


export default function Red() {
  return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.library_button_red}>
                <View style={styles.library_left}>
                    <Image style={styles.library_icon} source={require('../assets/cats/ragdoll.jpg')}/>
                    <Text style={styles.text_white}>CAT BREED</Text>
                </View>
                <View style={styles.library_right}>
                    <Text style={styles.see_white}>See more...</Text>
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

  library_button_red: {
    margin:5,
    padding:5,
    backgroundColor:'#B13434',
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
