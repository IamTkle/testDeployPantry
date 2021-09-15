import "./App.css";
import NavBar from "./components/navbar/NavBar";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";
import Inventory from "./components/pages/inventory/Inventory";
import ShoppingList from "./components/pages/shoppinglist/ShoppingList";
import ExpiredBin from "./components/pages/expiredbin/ExpiredBin";
import Account from "./components/pages/account/Account"
import React from "react";
import { CssBaseline } from "@material-ui/core";

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
  // const classes = useStyles();

  // const [navbarOpen, setNavbarOpen] = React.useState(true);

  return (
    <div className={`App`}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <Route path="/inventory" render={(routeprops) => <Inventory />} />
          <Route path="/shoplist" render={(routerprops) => <ShoppingList />} />
          <Route path="/expiredbin" render={(routerprops) => <ExpiredBin />} />
          <Route path="/account" render={(routerprops) => <Account />} />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
