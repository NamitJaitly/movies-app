import React from "react";
import { View, Text } from "react-native";
import tmdb from "../api/tmdb";
import Dropdown from "../components/Dropdown";
import MediaList from "../components/MediaList";

const options = [
  { label: "Now Playing", value: "now_playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

export default function HomeMovies({ navigation }) {
  const [subType, setSubType] = React.useState("now_playing");
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchData(subType, page);
  }, [subType, page]);

  async function fetchData(type, pageNum = 1) {
    try {
      const res = await tmdb.get(`/movie/${type}`, {
        params: { page: pageNum },
      });
      setData(res.data.results);
    } catch (e) {
      console.error(e);
    }
  }

  function goToShow(id) {
    navigation.navigate("Show", { id, mediaType: "movie" });
  }

  return (
    <View style={{ flex: 1 }}>
      <Dropdown options={options} selected={subType} onSelect={setSubType} />
      <MediaList
        data={data}
        onPressDetails={(id) => goToShow(id)}
        mediaType="movie"
        onNextPage={() => setPage((p) => p + 1)}
        onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
        showPaginationUI={true}
      />
    </View>
  );
}
