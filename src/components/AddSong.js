import React, { useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  makeStyles
} from "@material-ui/core";
import { Link, AddBoxOutlined } from "@material-ui/icons";
import ReactPlayer from "react-player";
import SoundcloudPlayer from "react-player/lib/players/SoundCloud";
import YoutubePlayer from "react-player/lib/players/YouTube";
import { useMutation } from "@apollo/react-hooks";
import { ADD_SONG } from "../graphql/mutations";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center"
  },
  urlInput: {
    margin: theme.spacing(1)
  },
  addSongButton: {
    margin: theme.spacing(1)
  },
  dialog: {
    textAlign: "center"
  },
  thumbnail: {
    width: "90%"
  }
}));

const DEFAULT_SONG = {
  duration: 0,
  title: "",
  artist: "",
  thumbnail: ""
};

function AddSong() {
  const classes = useStyles();
  const [addSong, { error }] = useMutation(ADD_SONG);
  const [dialog, setDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [isPlayable, setIsPlayable] = useState(false);
  const [song, setSong] = useState(DEFAULT_SONG);

  useEffect(() => {
    const isPlayable =
      SoundcloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);

    setIsPlayable(isPlayable);
  }, [url]);

  function handleSongChange(event) {
    const { name, value } = event.target;
    setSong(prevSong => ({
      ...prevSong,
      [name]: value
    }));
  }

  function handleCloseDialog() {
    setDialog(false);
  }

  async function handleAddSong() {
    try {
      const { artist, title, thumbnail, url, duration } = song;
      await addSong({
        variables: {
          artist: artist.length > 0 ? artist : null,
          duration: duration > 0 ? duration : null,
          thumbnail: thumbnail.length > 0 ? thumbnail : null,
          title: title.length > 0 ? title : null,
          url: url.length > 0 ? url : null
        }
      });
      handleCloseDialog();
      setSong(DEFAULT_SONG);
      setUrl("");
    } catch (error) {
      console.error("Error adding song", error);
    }
  }

  async function handleEditSong({ player }) {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  }

  function getYoutubeInfo(player) {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail
    };
  }

  function getSoundcloudInfo(player) {
    return new Promise(resolve => {
      player.getCurrentSound(songData => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace("-large", "-t500x500")
          });
        }
      });
    });
  }

  function handleError(field) {
    if (error) console.dir(error);
    return error?.networkError?.extensions?.path.includes(field);
  }

  const { thumbnail, title, artist } = song;

  return (
    <div className={classes.container}>
      <Dialog
        className={classes.dialog}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <img
            src={thumbnail}
            alt="Song thumbnail"
            className={classes.thumbnail}
          />
          <TextField
            value={title}
            onChange={handleSongChange}
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            error={handleError("title")}
            helperText={handleError("title") && "Fill out field"}
          />
          <TextField
            value={artist}
            onChange={handleSongChange}
            margin="dense"
            name="artist"
            label="Artist"
            fullWidth
            error={handleError("artist")}
            helperText={handleError("artist") && "Fill out field"}
          />
          <TextField
            value={thumbnail}
            onChange={handleSongChange}
            margin="dense"
            name="thumbnail"
            label="Thumbnail"
            fullWidth
            error={handleError("thumbnail")}
            helperText={handleError("thumbnail") && "Fill out field"}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddSong} variant="outlined" color="primary">
            Add Song
          </Button>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        className={classes.urlInput}
        onChange={event => setUrl(event.target.value)}
        value={url}
        placeholder="Add YouTube or SoundCloud URL"
        fullWidth
        margin="normal"
        type="url"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Link />
            </InputAdornment>
          )
        }}
      />
      <Button
        disabled={!isPlayable}
        className={classes.AddSongButton}
        onClick={() => setDialog(true)}
        variant="contained"
        color="primary"
        endIcon={<AddBoxOutlined />}
      >
        Add
      </Button>
      <ReactPlayer url={url} hidden={true} onReady={handleEditSong} />
    </div>
  );
}

export default AddSong;
