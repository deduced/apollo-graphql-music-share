import React from "react";
import { Typography, useMediaQuery } from "@material-ui/core";

import QueuedSong from "./QueuedSong";

// const song = {
//   title: "Ibiza Summer Mix",
//   artist: "Ibiza",
//   thumbnail: "http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
// };

function QueuedSongList({ queue }) {
  const isGreaterThanMediumBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up("md")
  );

  return (
    isGreaterThanMediumBreakpoint && (
      <div style={{ margin: "10px 0" }}>
        <Typography color="textSecondary" variant="button">
          Queue ({queue.length})
        </Typography>
        {queue.map((song, idx) => (
          <QueuedSong key={idx} song={song} />
        ))}
      </div>
    )
  );
}

export default QueuedSongList;
