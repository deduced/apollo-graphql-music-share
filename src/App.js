import React, { createContext, useContext, useReducer } from "react";
import songReducer from "./reducer";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery, Hidden } from "@material-ui/core";

export const SongContext = createContext({
  song: {
    artist: "will.i.am ft. Britney Spears",
    duration: 292,
    id: "3c34e456-29e7-4897-a0e3-fa94a2369545",
    thumbnail: "http://img.youtube.com/vi/kYtGl1dX5qI/0.jpg",
    title: "Scream & Shout",
    url:
      "https://www.youtube.com/watch?v=kYtGl1dX5qI&list=PLyORnIW1xT6zXT0KxIa-c4W4_yEW8OJAH&index=150"
  },
  isPlaying: false
});

function App() {
  const initialSongState = useContext(SongContext);
  const [state, dispatch] = useReducer(songReducer, initialSongState);

  const isGreaterThanSmallBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up("sm")
  );
  const isGreaterThanMediumBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up("md")
  );

  return (
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        <Grid
          style={{ paddingTop: isGreaterThanSmallBreakpoint ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        <Grid
          style={
            isGreaterThanMediumBreakpoint
              ? { position: "fixed", width: "100%", right: 0, top: 70 }
              : {
                  bottom: 0,
                  left: 0,
                  position: "fixed",
                  width: "100%"
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  );
}

export default App;
