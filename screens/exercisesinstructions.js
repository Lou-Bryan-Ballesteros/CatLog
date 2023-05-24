
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';


export default function ExercisesInstructions({route}) {
  const exercise_instruction = route.params;
  return (
      <View style={styles.main_container}>
        <ScrollView style={styles.body_container}>
          <View>
            <Text style={styles.title}>Exercises</Text>
            <View style={styles.games_card}>
              <Text style={styles.card_context}>{exercise_instruction.exercise_name}</Text>
                <View style={styles.image}>
                        <YoutubePlayer
                          height={300}
                          play={true}
                          videoId={exercise_instruction.exercise_link}
                        />
                </View>
              <Text style={styles.card_context}>Goal of the Exercise</Text>
              <Text style={styles.card_details}>{exercise_instruction.exercise_goal}</Text>
            </View>
          </View>
{/*           
          <View style={styles.games_rate}>
              <View style={styles.level_rate}>
                <TouchableOpacity style={styles.card_rate}></TouchableOpacity>
                <TouchableOpacity style={styles.card_rate}></TouchableOpacity>
                <TouchableOpacity style={styles.card_rate}></TouchableOpacity>
                <TouchableOpacity style={styles.card_rate}></TouchableOpacity>
                <TouchableOpacity style={styles.card_rate}></TouchableOpacity>
              </View>
              <Text style={styles.rate}>How was it?</Text>
          </View> */}
          

          <View style={styles.instructions_container}>
            <Text style={styles.instructions_title}>Instructions:</Text>
            <View style={styles.instructions_card}>
              <Text style={styles.card_details}>{exercise_instruction.exercise_instructions}</Text>
              
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
  
  title:{
    fontWeight:'bold',
    fontSize:20,
    color:'white',
  },

  instructions_title:{
    fontWeight:'bold',
    fontSize:20,
    // color:'white',
  },

  games_card: {
    backgroundColor:'#D9D9D9',
    margin:10,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },

  games_rate:{
    alignItems: 'center',
    // justifyContent: 'center',
    marginBottom:10,
  },

  level_rate: {
    flexDirection:'row',
  },

  card_rate: {
    backgroundColor:'green',
    margin:5,
    padding:5,
    width:'15%',
  },
  rate:{
    color:'white',
  },

  card_context:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    padding:10,
  },
  card_details:{
    fontSize: 16,
    margin:5,
  },

  instructions_container:{
    padding:10,
    backgroundColor:'#D9D9D9',
    borderRadius:10,
    marginBottom:20,
  },
  image:{
    width:300,
    height:170,
    borderWidth:2,
    borderColor:'#292929',
    borderRadius:10,
  }

});
