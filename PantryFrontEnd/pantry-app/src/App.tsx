import { CssBaseline, Hidden } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar, { navItem, navItems } from "./components/navbar/NavBar";
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

const checkLoggedInCookie = () => document.cookie.includes("loggedIn");
const isLoggedIn =
  process.env.NODE_ENV === "production" ? checkLoggedInCookie() : true;

// function urlBase64ToUint8Array(base64String: string | undefined) {
//   if (base64String) {
//     var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//     var base64 = (base64String + padding)
//       .replace(/\-/g, "+")
//       .replace(/_/g, "/");

//     var rawData = window.atob(base64);
//     var outputArray = new Uint8Array(rawData.length);

//     for (var i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
//   return;
// }

// const checkVapidKey = async (newKeyStr: string) => {
//   const reg = await navigator.serviceWorker.ready;
//   const pshMngr = reg.pushManager;
//   const sub = await pshMngr.getSubscription();

//   if (sub) {
//     sub.unsubscribe();
//     // const jsonForm = sub.toJSON();

//     // if (jsonForm && jsonForm.keys) {
//     //   const key = jsonForm.keys["p256dh"];

//     //   console.log("str form:", key);
//     //   console.log(sub);
//     //   if (key !== newKeyStr) {
//     //     sub.unsubscribe();
//     //     console.log("unsubscribed");
//     //   }
//     // const currKey = new Uint8Array(sub.getKey("p256dh") as ArrayBufferLike);

//     // console.log("curr key", currKey);

//     // const newKey = urlBase64ToUint8Array(newKeyStr);
//     // console.log("new key", newKey);

//     // if (currKey && newKey) {
//     //   if (currKey.byteLength !== newKey.byteLength) return;

//     //   for (let i = 0; i < currKey.byteLength; i++) {
//     //     if (currKey[i] !== newKey[i]) {
//     //       sub.unsubscribe();
//     //       return;
//     //     }
//     //   }
//   }
// };
export const DOMAIN = "https://pantties.azurewebsites.net";

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

    const strForm = process.env["REACT_APP_PUBLIC_VAPID_KEY"];
    // const vapidKey = urlBase64ToUint8Array(
    //   process.env["REACT_APP_PUBLIC_VAPID_KEY"]
    // );

    console.log("current key:", strForm);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then(async (value) => {
          // checkVapidKey(strForm as string);

          const pushSubscriptionOptions: PushSubscriptionOptionsInit = {
            applicationServerKey: strForm,
            userVisibleOnly: true,
          };

          let subscription = await value.pushManager.getSubscription();

          try {
            subscription = await value.pushManager.subscribe(
              pushSubscriptionOptions
            );
          } catch (e) {
            console.log(e);
            if (subscription) {
              const unsubParams: RequestInit = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
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
          {isLoggedIn && (
            <>
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
            </>
          )}
          <Switch>
            {isLoggedIn ? (
              <Redirect exact from="/" to="/inventory" />
            ) : (
              <Redirect from="/" to="/login" />
            )}
          </Switch>
          {navPageRoutes}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
