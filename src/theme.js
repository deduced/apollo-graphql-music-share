import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey, amber } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: amber,
    secondary: blueGrey
  }
});

export default theme;
