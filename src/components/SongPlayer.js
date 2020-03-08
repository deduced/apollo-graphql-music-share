import React from "react";
import QueuedSongList from "./QueuedSongList";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Slider,
  CardMedia,
  makeStyles
} from "@material-ui/core";
import { SkipPrevious, PlayArrow, SkipNext } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: { display: "flex", justifyContent: "space-between" },
  details: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 15px"
  },
  content: { flex: "1 0 auto" },
  thumbnail: { width: 150 },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

function SongPlayer() {
  const classes = useStyles();

  return (
    <div>
      <Card variant="outlined" className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5" component="h3">
              Title
            </Typography>
            <Typography variant="subtitle1" component="p" color="textSecondary">
              Artist
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <SkipPrevious />
            </IconButton>
            <IconButton>
              <PlayArrow className={classes.playIcon} />
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
        <CardMedia
          image="http://i3.ytimg.com/vi/0IA1vCyffos/hqdefault.jpg"
          className={classes.thumbnail}
        />
      </Card>
      <QueuedSongList />
    </div>
  );
}

export default SongPlayer;
