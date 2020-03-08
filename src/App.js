import React from "react";
import Header from "./components/Header";
import AddSong from "./components/AddSong";
import SongList from "./components/SongList";
import SongPlayer from "./components/SongPlayer";
import { Grid, useMediaQuery } from "@material-ui/core";

function App() {
  const isGreaterThanMediumBreakpoint = useMediaQuery(theme =>
    theme.breakpoints.up("md")
  );

  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid style={{ paddingTop: 80 }} item xs={12} md={7}>
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
    </>
  );
}

export default App;
