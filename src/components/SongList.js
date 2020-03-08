import React from "react";
import { CircularProgress } from "@material-ui/core";

import Song from "./Song";

function SongList() {
  let loading = false;

  const song = {
    title: "Ibiza Summer Mix",
    artist: "Ibiza",
    thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
  };

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
  return (
    <div>
      {Array.from({ length: 10 }, () => song).map((song, idx) => (
        <Song key={idx} song={song} />
      ))}
    </div>
  );
}

export default SongList;
