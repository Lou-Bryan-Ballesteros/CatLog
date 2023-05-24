
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import { ROUTES } from '../constants/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { baseUrl } from '../constants/url';
import { imgUrl } from '../constants/url';

export default function Games(props) {
  const { navigation } = props;


  const [games_list, setData] = useState([]);
  const getAllGames = async () => {
    await axios.get(`${baseUrl}getAllGames`)
      .then((response) => setData(response.data.payload))
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <View style={styles.body_container}>
      <FlatList
        data={games_list}
        numColumns={4}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity onPress={() => {navigation.navigate(ROUTES.GAMES_INSTRUCTIONS, item)}} style={styles.shortcut_container}>
              <Image style={styles.shortcut_icon} source={{uri:imgUrl + item.game_icon}} />
              <Text key={"game"} style={styles.shortcut_name} >{item.game_name}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <Text style={styles.title}>Games</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  body_container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#292929',
    width: '100%',
    alignItems: 'center',
  },

  shortcut_container: {
    margin: 5,
    alignItems: 'center',
  },

  shortcut_icon: {
    width: 80,
    height: 80,
  },

  shortcut_name: {
    fontSize: 14,
    color: 'white',
  },

  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
