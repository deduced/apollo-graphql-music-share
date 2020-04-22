import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  makeStyles
} from "@material-ui/core";
import { PlayArrow, Save, Pause } from "@material-ui/icons";
import { SongContext } from "../App";
import { useMutation } from "@apollo/react-hooks";
import { ADD_OR_REMOVE_FROM_QUEUE } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(3)
  },
  songInfoContainer: {
    display: "flex",
    alignItems: "center"
  },
  songInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  thumbnail: {
    objectFit: "cover",
    width: 140,
    height: 140
  }
}));

function Song({ song }) {
  const classes = useStyles();
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE);
  const { state, dispatch } = useContext(SongContext);
  const [isCurrentSongPlaying, setCurrentSongPlaying] = useState(false);
  const { artist, thumbnail, title } = song;

  useEffect(() => {
    const isSongPlaying = state.isPlaying && song.id === state.song.id;
    setCurrentSongPlaying(isSongPlaying);
  }, [state.isPlaying, song.id, state.song.id]);

  function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song } });
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: "Song" } }
    });
  }

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size="small" color="primary">
              {isCurrentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size="small"
              color="secondary"
            >
              <Save />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

export default Song;
