import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import React from "react";
import { Container, CssBaseline, Grid, Hidden } from "@material-ui/core";
import AddRouting from "./components/AddRouting";
import { navItems, navItem } from "./components/navbar/NavBar";
import { pageToIndex } from "./components/routingTable";

const theme = createTheme({
  palette: {
    primary: {
      dark: "#31C15B",
      main: "#52D378",
      // dark: "#52D378",
      // main: "#31C15B",
      light: "#BDF2C9",
    },
    secondary: {
      // main: "#E6AA38",
      light: "#F9DFAF",
      main: "#efa448",
    },
    text: {
      primary: "#666666",
      secondary: "#BDBDBD",
      // secondary: "#edabeC",
    },
    background: {
      default: "#FFFFFF",
    },
    info: {
      main: "#a2e9f3",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Cambay,sans-serif",
    fontSize: 16,
  },
});

function App() {
  const location = window.location.pathname;
  const [navTab, setNavTab] = React.useState(() => pageToIndex(location));

  const [navIsOpen, setNavOpen] = React.useState(false);

  const callBackNavOpen = React.useCallback(() => {
    setNavOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    Notification.requestPermission((status) => {
      console.log("Permission", status);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Hidden smDown={true}>
            <NavBar
              currNavTab={navTab}
              drawerVariant="permanent"
              setNavTab={setNavTab}
              setNavOpen={setNavOpen}
            />
          </Hidden>
          <Hidden mdUp={true}>
            <NavBar
              currNavTab={navTab}
              drawerVariant="temporary"
              open={navIsOpen}
              setNavTab={setNavTab}
              setNavOpen={setNavOpen}
            />
          </Hidden>
          {navItems.map((item: navItem) => {
            return (
              <Route
                key={pageToIndex(item.link)}
                path={item.link}
                render={(routeprops) => {
                  const HigherOrder = AddRouting(item.component);

                  return (
                    <HigherOrder
                      routeprops={routeprops}
                      setNavTab={setNavTab}
                      setNavOpen={callBackNavOpen}
                    />
                  );
                }}
              />
            );
          })}

          <Redirect from="/" to="/inventory" />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
