import React, { useContext, useState, useRef, useEffect } from "react";
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
  const reactPlayerRef = useRef();
  const { state, dispatch } = useContext(SongContext);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [positionInQueue, setPositionInQueue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const songIndex = data.queuedSongs.findIndex(
      (song) => song.id === state.song.id
    );
    setPositionInQueue(songIndex);
  }, [data.queuedSongs, state.song.id]);

  useEffect(() => {
    const nextSong = data.queuedSongs[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      setPlayed(0);
      dispatch({ type: "SET_SONG", payload: { song: nextSong } });
    }
  }, [data.queuedSongs, played, dispatch, positionInQueue]);

  function handleTogglePlay() {
    dispatch(state.isPlaying ? { type: "PAUSE_SONG" } : { type: "PLAY_SONG" });
  }

  function handleSliderChange(event, newValue) {
    setPlayed(newValue);
  }

  function handleSeekMouseUp() {
    setIsSeeking(false);
    reactPlayerRef.current.seekTo(played);
  }

  function formatSongDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  function handleSkipSong(isNext) {
    const idx = isNext ? positionInQueue + 1 : positionInQueue - 1;
    const song = data.queuedSongs[idx];
    if (song) {
      dispatch({ type: "SET_SONG", payload: { song: song } });
    }
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
            <IconButton onClick={() => handleSkipSong()}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={() => handleSkipSong(true)}>
              <SkipNext />
            </IconButton>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              {formatSongDuration(playedSeconds)}
            </Typography>
          </div>
          <Slider
            onMouseDown={() => setIsSeeking(true)}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSliderChange}
            value={played}
            type="range"
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
          onProgress={({ played, playedSeconds }) => {
            if (!isSeeking) {
              setPlayed(played);
              setPlayedSeconds(playedSeconds);
            }
          }}
        />
        <CardMedia image={state.song.thumbnail} className={classes.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queuedSongs} />
    </>
  );
}

export default SongPlayer;
