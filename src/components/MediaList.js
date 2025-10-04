import React from 'react';
import { FlatList, View, Text, Button } from 'react-native';
import MediaItem from './MediaItem';

export default function MediaList({data, onPressDetails, mediaType, onNextPage, onPrevPage, showPaginationUI}) {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item)=>String(item.id)}
        renderItem={({item}) => <MediaItem item={item} onPressDetails={onPressDetails} mediaType={mediaType} />}
      />
      {showPaginationUI && (
        <View style={{flexDirection:'row', justifyContent:'space-between', padding:8}}>
          <Button title="Prev" onPress={onPrevPage} disabled={!onPrevPage} />
          <Button title="Next" onPress={onNextPage} disabled={!onNextPage} />
        </View>
      )}
    </>
  );
}