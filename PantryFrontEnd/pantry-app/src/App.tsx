import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { StaticContext, RouteComponentProps } from "react-router";
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
      // default: "#f4f2f8",
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

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((value) => {
          const pushSubscriptionOptions: PushSubscriptionOptionsInit = {
            applicationServerKey:
              "BCzbXwCuFZeGL6sFNy-1wHGpq8xu1qCVXYel0gy9GjVNWUIoGckopULc9wfWJTtqwnoXjo_dS8H-cDhJ4XY8NcI",
            userVisibleOnly: true,
          };
          value.pushManager
            .subscribe(pushSubscriptionOptions)
            .then((subscription) => {
              console.log("Subscription info: ", JSON.stringify(subscription));
            });

          console.log("success", value);
        })
        .catch((value) => console.error("fail", value));
    }
  }, []);

  const renderRoute = React.useCallback(
    (item: navItem) => {
      const PageComponent = item.component;

      return <PageComponent setNavOpen={callBackNavOpen} />;
    },
    [callBackNavOpen]
  );

  const getNavPageRoutes = () =>
    navItems.map((item: navItem) => {
      return (
        <Route
          key={pageToIndex(item.link)}
          path={item.link}
          render={() => renderRoute(item)}
        />
      );
    });

  const navPageRoutes = React.useMemo(getNavPageRoutes, [renderRoute]);

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
          {navPageRoutes}
          <Redirect exact from="/" to="/inventory" />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
