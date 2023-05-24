
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

import { ROUTES } from '../constants/routes';


export default function Settings(props) {
  const {navigation} = props;
  return (
      <View style={styles.body_container}>
            <TouchableOpacity style={styles.settings_button} onPress={()=>navigation.navigate(ROUTES.ARTICLES)}>
                <View style={styles.library_left}>
                    <Image style={styles.library_icon} source={require('../assets/icons/navigation/settings.png')}/>
                    <Text style={styles.text}>Go to Articles</Text>
                </View>
                <View style={styles.library_right}>
                    <Text style={styles.see}>Proceed...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settings_button} onPress={()=>navigation.navigate(ROUTES.GAMES)}>
                <View style={styles.library_left}>
                    <Image style={styles.library_icon} source={require('../assets/icons/navigation/settings.png')}/>
                    <Text style={styles.text}>Go to Games</Text>
                </View>
                <View style={styles.library_right}>
                    <Text style={styles.see}>Proceed...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settings_button} onPress={()=>navigation.navigate(ROUTES.MORE_CATS)}>
                <View style={styles.library_left}>
                    <Image style={styles.library_icon} source={require('../assets/icons/navigation/settings.png')}/>
                    <Text style={styles.text}>Take Me To Breeds</Text>
                </View>
                <View style={styles.library_right}>
                    <Text style={styles.see}>Proceed...</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.LOGIN)}><Text style={styles.signouttext}>Log Out</Text></TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  body_container: {
    flex:1,
    padding:10,
    backgroundColor:'#292929',
    width:'100%', 
    alignItems:'center',
  },

  title:{
    fontWeight:'bold',
    fontSize:20,
    color:'#D2DFE2',
  },

  settings_button: {
    margin:5,
    padding:5,
    backgroundColor:'#D2DFE2',
    width:'100%',
    borderBottomColor: '#CDCDCD',
    borderBottomWidth:2,
    borderRadius:10,
    flexDirection:'row',
  },
  
  library_left: {
    width:'50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:'row',
  },

  text:{
    fontWeight:'bold',
    color: '#585353',
    fontSize:15,
  },
  
  see:{
    padding:10,
    color: '#585353',
  },


  library_right: {
    width:'50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  library_icon: {
    margin:5,
    width:50,
    height:50,
    borderRadius:10,
  },
  signouttext: {
    textAlign: 'center',
    fontSize:16,
    padding:5,
    fontWeight:'bold',
    color: 'white',
    margin:10,
    backgroundColor:'red',
    width:100,
    borderRadius:30,
  },

});
