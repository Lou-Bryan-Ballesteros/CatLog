
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';


export default function Topic({route}) {
  const article_details = route.params;
  return (
      <View style={styles.main_container}>
        <ScrollView style={styles.body_container}>
          <View style={styles.topic_container}>
            <View style={styles.topic_card}>
              <Image style={styles.image} source={{uri:article_details.article_photo}}/>
            </View>
          </View>
          <View style={styles.details_container}>
            <View style={styles.title_container}>
              <Text style={styles.title}>{article_details.article_name}</Text>
            </View>
            <View style={styles.details_card}>
                <Text style={styles.topic_context}>{article_details.article_content}</Text>
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

  back:{
    fontWeight:'bold',
    fontSize:18,
    color:'white',
    // color:'#585353',
  },

  
  title:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
    color:'white',
  },

  topic_card: {
    backgroundColor:'#D9D9D9',
    margin:10,
    padding:10,
    borderRadius:10,
    backgroundColor:'#f5f5f5',
    borderRadius:5,
  },

  topic_context:{
    textAlign:'justify',
  },

  details_card:{
    padding:10,
    backgroundColor:'#f5f5f5',
    borderRadius:5,
  },
  
  image:{
    width:'100%',
    height:220,
    borderRadius:10,
  },

  details_container:{
    marginBottom:20,
  }

});
