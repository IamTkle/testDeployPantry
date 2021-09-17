import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import React from "react";
import { CssBaseline } from "@material-ui/core";
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
    secondary: { main: "#E6AA38", light: "#F9DFAF" },
    text: {
      primary: "#666666",
      secondary: "#BDBDBD",
    },
    background: {
      default: "#FFFFFF",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Cambay,sans-serif",
  },
});

function App() {
  const location = window.location.pathname;
  const [navTab, setNavTab] = React.useState(pageToIndex(location));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar currNavTab={navTab} setNavTab={setNavTab} />

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
