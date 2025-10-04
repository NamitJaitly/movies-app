import React from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import tmdb from "../api/tmdb";
import MediaList from "../components/MediaList";

export default function SearchScreen({ navigation }) {
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("movie");
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(null);

  const search = async (page = 1) => {
    if (!q.trim()) {
      setError("Please enter a search query");
      return;
    }
    setError(null);
    try {
      const res = await tmdb.get(`/search/${type}`, {
        params: { query: q, page },
      });
      setResults(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const goToShow = (id) =>
    navigation.navigate("Show", {
      id,
      mediaType: type === "movie" ? "movie" : "tv",
    });

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <TextInput placeholder="Search term" value={q} onChangeText={setQ} />
      <Button onPress={() => search()}>Search</Button>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      {!q ? (
        <Text style={{ marginTop: 12 }}>Please enter a search query</Text>
      ) : null}
      <MediaList
        data={results}
        onPressDetails={goToShow}
        mediaType={type === "movie" ? "movie" : "tv"}
      />
    </View>
  );
}
