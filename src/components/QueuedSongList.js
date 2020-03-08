import React from "react";
import { Typography } from "@material-ui/core";

import QueuedSong from "./QueuedSong";

const song = {
  title: "Ibiza Summer Mix",
  artist: "Ibiza",
  thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
};

function QueuedSongList() {
  return (
    <div style={{ margin: "10px 0" }}>
      <Typography color="textSecondary" variant="button">
        Queue (5)
      </Typography>
      {Array.from({ length: 5 }, () => song).map((song, idx) => (
        <QueuedSong key={idx} song={song} />
      ))}
    </div>
  );
}

export default QueuedSongList;
