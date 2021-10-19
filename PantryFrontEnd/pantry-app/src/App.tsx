import { CssBaseline, Hidden } from "@material-ui/core";
import { VariantType, useSnackbar } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { LocationDescriptor } from "history";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NavBar, { navItem, navItems } from "./components/navbar/NavBar";
import { pageToIndex } from "./components/routingTable";

const theme = createTheme({
  palette: {
    primary: {
      // dark: "#31C15B",
      dark: "#2aa64e",
      // main: "#52D378",
      main: "#2eb455",
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

export const DOMAIN = "https://pantties.azurewebsites.net";

interface SetLoggedIn {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export type MyLocationDesc = LocationDescriptor<any> & SetLoggedIn;

const checkLoggedInCookie = () => document.cookie.includes("LoggedIn");

function App() {
  const [navTab, setNavTab] = React.useState(0);

  const loggedInState = React.useState(() =>
    process.env.NODE_ENV !== "production" ? checkLoggedInCookie() : true
  );

  const [isLoggedIn, setLoggedIn] = loggedInState;

  const [navIsOpen, setNavOpen] = React.useState(false);

  const callBackNavOpen = React.useCallback(() => {
    setNavOpen((prev) => !prev);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (Notification.permission !== "granted")
      Notification.requestPermission((status) => {
        console.log("Permission", status);
        enqueueSnackbar("Notifications permissions are needed!", {
          variant: "info",
        });
      });

    const strForm = process.env["REACT_APP_PUBLIC_VAPID_KEY"];
    // const vapidKey = urlBase64ToUint8Array(
    //   process.env["REACT_APP_PUBLIC_VAPID_KEY"]
    // );

    console.log("current key:", strForm);

    if ("serviceWorker" in navigator && isLoggedIn) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then(async (value) => {
          // checkVapidKey(strForm as string);

          const pushSubscriptionOptions: PushSubscriptionOptionsInit = {
            applicationServerKey: strForm,
            userVisibleOnly: true,
          };

          let subscription = await value.pushManager.getSubscription();

          console.log(subscription?.toJSON());

          try {
            subscription = await value.pushManager
              .subscribe(pushSubscriptionOptions)
              .catch((e) => {
                throw e;
              });
          } catch (e) {
            console.log(e);
            if (subscription) {
              const unsubParams: RequestInit = {
                method: "DELETE",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription.toJSON()),
              };
              const resp = await fetch(
                DOMAIN + "/api/DeleteSubcriptions",
                unsubParams
              );
              if (resp.ok) await subscription.unsubscribe();
            }

            subscription = await value.pushManager.subscribe(
              pushSubscriptionOptions
            );
            console.log("Subscription info: ", JSON.stringify(subscription));

            const subscriptionParams: RequestInit = {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(subscription),
            };

            const resp = await fetch(
              DOMAIN + "/api/subcriptions/",
              subscriptionParams
            );

            if (resp.ok) {
              const data = await resp.json();
              console.log(data);
            } else {
              console.error("Subscription unsuccessful:", resp);
            }
          }
        });
    }
  }, [isLoggedIn]);

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

  const handleLogout = async (callbackFn: () => void) => {
    const resp = await fetch(DOMAIN + "/api/Users/Logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((e) => console.error(e));

    if (!resp) {
      callbackFn();
      return;
    }

    // success
    if (resp.ok || resp.status === 401) {
      document.cookie =
        "LoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;" +
        document.cookie;
      callbackFn();
      setLoggedIn(false);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isLoggedIn && (
            <>
              <Hidden smDown={true}>
                <NavBar
                  currNavTab={navTab}
                  drawerVariant="permanent"
                  setNavTab={setNavTab}
                  setNavOpen={setNavOpen}
                  handleLogout={handleLogout}
                />
              </Hidden>
              <Hidden mdUp={true}>
                <NavBar
                  currNavTab={navTab}
                  drawerVariant="temporary"
                  open={navIsOpen}
                  setNavTab={setNavTab}
                  setNavOpen={setNavOpen}
                  handleLogout={handleLogout}
                />
              </Hidden>
            </>
          )}
          {navPageRoutes}
          <Switch>
            {isLoggedIn ? (
              <>
                {/* <Redirect exact from="/" to="/inventory" /> */}
                <Redirect exact from="/login" to="/inventory" />
              </>
            ) : (
              <Redirect
                // from="/"
                to={
                  {
                    pathname: "/login",
                    setLoggedIn: loggedInState[1],
                  } as MyLocationDesc
                }
              />
            )}
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
