import "./App.css";
import NavBar from "./components/navbar/NavBar";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Inventory from "./components/pages/Inventory";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#31C15B",
      // main: "#52D378",
      // dark: "#52D378",
      main: "#31C15B",
      light: "#BDF2C9",
    },
    secondary: { main: "#E6AA38" },
    text: {
      primary: "#666666",
      secondary: "#FFFFFF",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Roboto ,sans-serif",
  },
});

const useStyles = makeStyles(
  createStyles({
    root: { display: "grid" },
    navbar: {
      backgroundColor: theme.palette.primary.dark,
      wordSpacing: theme.spacing(3),
    },
    navbarIcons: {
      color: "#FFFFFF",
    },
  })
);

function App() {
  const classes = useStyles();

  const [navbarOpen, setNavbarOpen] = React.useState(true);

  const closeNavbar = () => setNavbarOpen(false);
  const openNavbar = () => setNavbarOpen(true);
  return (
    <div className={`App ${classes.root}`}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <NavBar navbarOpen={navbarOpen} />
            </Grid>
            <Grid item xs={8}>
              {/* <div onClick}></div> */}
              <Route
                path="/inventory"
                render={(routeprops) => (
                  <Inventory
                    closeNavbar={closeNavbar}
                    openNavbar={openNavbar}
                  />
                )}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
