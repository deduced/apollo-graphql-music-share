import React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";

import QueuedSong from "./QueuedSong";

const song = {
  title: "Ibiza Summer Mix",
  artist: "Ibiza",
  thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
};

function QueuedSongList() {
  const isGreaterThanMediumBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up("md")
  );

  return (
    isGreaterThanMediumBreakpoint && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          Queue (5)
        </Typography>
        {Array.from({ length: 5 }, () => song).map((song, idx) => (
          <QueuedSong key={idx} song={song} />
        ))}
      </div>
    )
  );
}

export default QueuedSongList;
