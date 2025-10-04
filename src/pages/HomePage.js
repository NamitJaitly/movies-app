import React from "react";
import { View, ActivityIndicator, Button } from "react-native";
import tmdb from "../api/tmdb";
import Dropdown from "../components/Dropdown";
import MediaList from "../components/MediaList";

const OPTIONS = [
  { label: "Airing Today", value: "airing_today" },
  { label: "On The Air", value: "on_the_air" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
];

export default function HomePage({ navigation }) {
  const [subType, setSubType] = React.useState("airing_today");
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchTV(subType);
  }, [subType]);

  async function fetchTV(type) {
    setLoading(true);
    try {
      const res = await tmdb.get(`/tv/${type}`, { params: { page: 1 } });
      setResults(res.data.results || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleDetails(id) {
    navigation.navigate("Show", { id, mediaType: "tv" });
  }

  return (
    <View style={{ flex: 1 }}>
      <Dropdown options={OPTIONS} selected={subType} onSelect={setSubType} />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <MediaList data={results} onDetails={handleDetails} mediaType="tv" />
      )}
    </View>
  );
}
