import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import axios from 'axios';

import { baseUrl } from '../constants/url';

export default function Articles({ navigation }) {
  const [articlesList, setArticlesList] = useState([]);

  useEffect(() => {
    getAllArticles();
  }, []);

  const getAllArticles = async () => {
    try {
      const response = await axios.get(`${baseUrl}getAllArticles`);
      setArticlesList(response.data.payload);
    } catch (error) {
      console.log('Error fetching articles:', error);
    }
  };

  const renderArticle = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.articleContainer,
        { backgroundColor: index % 2 === 0 ? '#3A5999' : '#B13434' },
      ]}
      onPress={() => navigation.navigate(ROUTES.TOPIC, item)}
    >
      <View style={styles.libraryLeft}>
        <Image style={styles.icon} source={{ uri: item.article_photo }} />
        <Text style={styles.text}>{item.article_name}</Text>
      </View>
      <View style={styles.libraryRight}>
        <Text style={styles.see}>See more...</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={articlesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  articleContainer: {
    margin: 5,
    padding: 5,
    borderBottomColor: '#CDCDCD',
    borderBottomWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
  },
  libraryLeft: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 15,
  },
  see: {
    padding: 10,
    color: '#ffffff',
  },
  libraryRight: {
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  icon: {
    margin: 10,
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
