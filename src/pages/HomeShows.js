import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import tmdb from '../api/tmdb';

export default function HomeShows({ route }) {
  const { id, mediaType } = route.params || {}; 
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    if (id && mediaType) {
      fetchDetails();
    }
  }, [id, mediaType]);

  async function fetchDetails(){
    try {
      const path = mediaType === 'tv' ? `/tv/${id}` : `/movie/${id}`;
      const res = await tmdb.get(path);
      setDetails(res.data);
    } catch(e) {
      console.error(e);
    }
  }

  if (!id || !mediaType) {
    return <Text>No media selected.</Text>;
  }

  if (!details) return <Text>Loading...</Text>;

  const poster = details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : null;

  return (
    <ScrollView style={{ padding: 12 }}>
      {poster && <Image source={{ uri: poster }} style={{ width: '100%', height: 400 }} />}
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{details.title || details.name}</Text>
      <Text>Release: {details.release_date || details.first_air_date}</Text>
      <Text style={{ marginTop: 10 }}>{details.overview}</Text>
    </ScrollView>
  );
}