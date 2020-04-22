import React from "react";
import { Avatar, Typography, IconButton, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

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
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
  const { artist, thumbnail, title } = song;

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } }
    });
  }
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
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color="error" />
      </IconButton>
    </div>
  );
}

export default QueuedSong;
