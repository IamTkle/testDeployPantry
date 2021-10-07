import React, { ReactElement } from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  makeStyles,
  Theme,
  useTheme,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
} from "@material-ui/core";
import InventoryIcon from "@material-ui/icons/AllInbox";
import ShoppingListIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExpiredBinIcon from "@material-ui/icons/DeleteOutline";
import RecipeIcon from "@material-ui/icons/MenuBookOutlined";
import QRIcon from "@material-ui/icons/CropFreeOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { createStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { pageToIndex } from "../routingTable";
import Inventory from "../pages/inventory/Inventory";
import ShoppingList from "../pages/shoppinglist/ShoppingList";
import ExpiredBin from "../pages/expiredbin/ExpiredBin";
import Account from "../pages/account/Account";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import Recipe from "../pages/recipe/Recipe";

export type navItem = {
  icon: ReactElement<any, any>;
  component: React.FC<any>;
  descText: string;
  link: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      // background: theme.palette.background.default,
      background: theme.palette.primary.dark,
      width: theme.spacing(30),
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
      color: "white",
    },
    root: {
      "&.Mui-selected": {
        // backgroundColor: theme.palette.primary.light,
        backgroundColor: theme.palette.primary.main,
        // color: theme.palette.primary.dark,
        color: "white",
        fontWeight: 700,
        fontSize: "1.15rem",
        transition: "color 250ms ease-out",
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderColor: theme.palette.primary.main,
        outline: `${theme.spacing(1)} solid ${theme.palette.primary.main}`,
        outlineColor: theme.palette.primary.main,
        letterSpacing: 1.5,
        "&:hover": {
          color: theme.palette.primary.light,
          "& svg": {
            color: theme.palette.primary.light,
          },
        },
        "& svg": {
          fontWeight: 700,
          color: "white",
        },
      },
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      // color: theme.palette.text.primary,
      color: theme.palette.primary.light,
      fontSize: "1rem",
    },
    icon: {
      color: theme.palette.primary.dark,
    },
  })
);

interface NavbarProps {
  currNavTab: number;
  setNavTab: React.Dispatch<React.SetStateAction<number>>;
  drawerVariant: "permanent" | "persistent" | "temporary" | undefined;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

const NavBar: React.FC<NavbarProps> = ({
  currNavTab,
  setNavTab,
  drawerVariant,
  setNavOpen,
  open = false,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleNavClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number | undefined
  ) => {
    if (i !== undefined) {
      setNavTab(i);
    }
  };

  return (
    <Drawer
      variant={drawerVariant}
      open={open}
      anchor="left"
      color={theme.palette.primary.dark}
      classes={{ paper: classes.paper }}
      onClose={() => setNavOpen(false)}
    >
      <List component="nav">
        {navItems.map((item) => {
          return (
            <Link
              key={item.link}
              to={item.link}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                button
                selected={currNavTab === pageToIndex(item.link)}
                onClick={(e) => handleNavClick(e, pageToIndex(item.link))}
                alignItems="center"
                classes={{ selected: classes.root }}
                className={classes.root}
              >
                <ListItemIcon style={{ color: theme.palette.primary.light }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.descText} disableTypography />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavBar;

export const navItems: navItem[] = [
  {
    descText: "Inventory",
    link: "/inventory",
    component: Inventory,
    icon: <InventoryIcon />,
  },

  {
    descText: "Shopping List",
    link: "/shoplist",
    component: ShoppingList,
    icon: <ShoppingListIcon />,
  },

  {
    descText: "Expired Bin",
    link: "/expiredbin",
    component: ExpiredBin,
    icon: <ExpiredBinIcon />,
  },

  {
    descText: "Recipes",
    link: "/recipes",
    component: Recipe,
    icon: <RecipeIcon />,
  },

  {
    descText: "QR Scan",
    link: "/qrscan",
    component: React.Fragment,
    icon: <QRIcon />,
  },

  {
    descText: "Settings",
    link: "/settings",
    component: React.Fragment,
    icon: <SettingsIcon />,
  },

  {
    descText: "Account",
    link: "/account",
    component: Account,
    icon: <AccountIcon />,
  },

  {
    descText: "Login",
    link: "/login",
    component: Login,
    icon: <AccountIcon />,
  },
  {
    descText: "Signup",
    link: "/signup",
    component: Signup,
    icon: <AccountIcon />,
  },
];
