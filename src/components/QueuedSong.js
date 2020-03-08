import React from "react";
import { Avatar, Typography, IconButton, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44
  },
  container: {
    // display: "grid",
    // gridAutoFlow: "column",
    // gridTemplateColumns: "50px auto 50px",
    // gridGap: 12,
    display: "flex",
    alignItems: "center",
    marginTop: 10
  },
  text: {
    textOverflow: "elipsis",
    overflow: "hidden"
  },
  songInfoContainer: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    marginLeft: 20,
    flexGrow: 1
  }
});

function QueuedSong({ song }) {
  const classes = useStyles();

  const { artist, thumbnail, title } = song;
  return (
    <div className={classes.container}>
      <Avatar src={thumbnail} alt="Song thumbnail" className={classes.avatar} />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant="subtitle2">
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="body2"
        >
          {artist}
        </Typography>
      </div>
      <IconButton>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSong;
