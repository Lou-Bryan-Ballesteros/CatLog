
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';


export default function BottomNav() {
  return (
    <View style={styles.bottom_nav_container}>
              <Image style={styles.nav_icon} source={require('../assets/icons/navigation/home.png')}/>
              <Image style={styles.nav_icon} source={require('../assets/icons/navigation/search.png')}/>
              <Image style={styles.nav_icon} source={require('../assets/icons/navigation/footprint.png')}/>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bottom_nav_container: {
    flex:0.06,
    padding:10,
    backgroundColor:'#D2DFE2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
  },
  nav_icon: {
    marginLeft:30,
    marginRight:30,
    width: 40,
    height: 40,
  },
});
