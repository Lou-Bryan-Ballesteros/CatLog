
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { ROUTES } from '../constants/routes';


export default function TopNav(props) {
  const {navigation} = props;
  return (
      <View style={styles.top_nav_container}>
        <View style={styles.icon_container}>
          <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.PROFILE)}><Image style={styles.nav_icon} source={require('../assets/icons/navigation/cat.png')}/></TouchableOpacity>
          <TouchableOpacity><Text style={styles.cat_name}>Catto</Text></TouchableOpacity>
        </View>
        <View style={styles.whistle_container}>
        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.CLICKER)}><Image style={styles.nav_icon} source={require('../assets/icons/navigation/whistle.png')}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate(ROUTES.SETTINGS)}><Image style={styles.nav_icon} source={require('../assets/icons/navigation/settings.png')}/></TouchableOpacity>
        </View>
        {/* <StatusBar style="auto" /> */}
      </View>
  );
}

const styles = StyleSheet.create({
  top_nav_container: {
    flex:0.1,
    padding:10,
    backgroundColor:'#D2DFE2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  icon_container: {
    width:'100%',
    height:'100%',
    flex:0.5,
    alignItems: 'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  nav_icon: {
    margin:10,
    width: 50,
    height: 50,
  },
  cat_name: {
    margin:5,
    fontSize:20,
  },

  whistle_container: {
    width:'100%',
    height:'100%',
    flex:0.5,
    alignItems: 'center',
    justifyContent:'flex-end',
    flexDirection:'row',
  },
  whistle_icon: {
    margin:10,
    width: '28%',
    height: '72%',
  },

});
