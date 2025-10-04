import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function MediaItem({item, onPressDetails, mediaType}) {
  const poster = item.poster_path ? `https://image.tmdb.org/t/p/w342${item.poster_path}` : null;
  return (
    <View style={styles.container}>
      {poster ? <Image source={{uri: poster}} style={styles.poster} /> : <View style={[styles.poster, styles.placeholder]} />}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text>{item.release_date || item.first_air_date || ''}</Text>
        <Button mode="outlined" onPress={() => onPressDetails(item.id, mediaType)}>More details</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection:'row', padding:8, borderBottomWidth:1, borderColor:'#eee' },
  poster: { width:80, height:120, borderRadius:6 },
  placeholder: { backgroundColor:'#ccc' },
  content: { flex:1, paddingLeft:10 },
  title: { fontWeight:'bold', fontSize:16 }
});