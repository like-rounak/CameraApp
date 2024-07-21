import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const FeedScreen = ({ route }) => {
  const { photos } = route.params;

  const renderItem = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
    </View>
  );

  return (
    <FlatList
      data={photos}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
    />
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    width,
    height,
  },
  photo: {
    width,
    height,
  },
});

export default FeedScreen;
