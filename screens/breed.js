import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';

export default function Breed({ route }) {
  const breedDetail = route.params;

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.bodyContainer}>
        <View style={styles.breedsCard}>
          <Image style={styles.image} source={{ uri: breedDetail.breed_photo }} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.breedTitle}>{breedDetail.breed_name}</Text>
          </View>
          <View style={styles.breedRow}>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Popularity</Text>
              <Text style={styles.breedMark}>#1</Text>
            </View>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Hypoallergenic</Text>
              <Text style={styles.breedMark}>{breedDetail.breed_hypo}</Text>
            </View>
          </View>
          <View style={styles.breedDetails}>
            <Text style={styles.detailsTitle}>Shedding</Text>
            <Text style={styles.breedContext}>{breedDetail.breed_shed}</Text>
          </View>
          <View style={styles.breedRow}>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Temperament</Text>
              <Text style={styles.breedContext}>{breedDetail.breed_temperament}</Text>
            </View>
            <View style={styles.breedColumn}>
              <Text style={styles.detailsTitle}>Child Friendly</Text>
              <Text style={styles.breedContext}>{breedDetail.breed_friendly}</Text>
            </View>
          </View>
          <View style={styles.breedDetails}>
            <Text style={styles.detailsTitle}>Vocalization</Text>
            <Text style={styles.breedContext}>{breedDetail.breed_vocal}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#292929',
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleContainer: {
    marginBottom: 10,
  },
  breedTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  breedsCard: {
    backgroundColor: '#D9D9D9',
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  breedDetails: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  breedContext: {
    fontSize: 16,
    padding: 10,
  },
  detailsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    fontSize: 20,
    padding: 10,
    backgroundColor: '#ba0082',
    borderWidth: 1,
    borderColor: 'white',
  },
  breedRow: {
    flexDirection: 'row',
  },
  breedColumn: {
    width: '50%',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  breedMark: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
  },
});
