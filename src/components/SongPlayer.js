import React, { useContext } from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, SkipNext, Pause } from "@material-ui/icons";
import { SongContext } from "../App";
import { useQuery } from "@apollo/react-hooks";
import { GET_QUEUED_SONGS } from "../graphql/queries";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  container: { display: "flex", justifyContent: "space-between" },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px",
  },
  content: { flex: "1 0 auto" },
  thumbnail: { width: 150 },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function SongPlayer() {
  const { data, loading, error } = useQuery(GET_QUEUED_SONGS);
  const { state, dispatch } = useContext(SongContext);
  const classes = useStyles();

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  if (error) console.error("there was an issue with GET_QUEUED_SONGS");

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              {state.song.title}
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {state.song.artist}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              00:01:59
            </Typography>
          </div>
          <Slider type="range" min={0} max={1} step={0.01} />
        </div>
        <ReactPlayer url={state.song.url} playing={state.isPlaying} hidden />
        <CardMedia image={state.song.thumbnail} className={classes.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queuedSongs} />
    </>
  );
}

export default SongPlayer;
