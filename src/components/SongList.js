import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";

import Song from "./Song";
import { GET_SONGS } from "../graphql/queries";

function SongList() {
  const { data, loading, error } = useQuery(GET_SONGS);

  // const song = {
  //   title: "Ibiza Summer Mix",
  //   artist: "Ibiza",
  //   thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
  // };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 50
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) return <div>Error getting songs! Please try again. </div>;

  return (
    <div>
      {data.songs.map(song => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  );
}

export default SongList;
