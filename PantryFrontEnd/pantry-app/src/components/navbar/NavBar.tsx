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

export type navItem = {
  icon: ReactElement<any, any>;
  component: React.FC<any>;
  descText: string;
  link: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.background.default,
      width: theme.spacing(35),
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    root: {
      "&.Mui-selected": {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.dark,
        fontWeight: 700,
        fontSize: "1.25rem",
        transition: "color 250ms ease-out, font-size 125ms ease-in",
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        borderColor: theme.palette.primary.main,
        outline: `${theme.spacing(1)} solid ${theme.palette.primary.main}`,
        outlineColor: theme.palette.primary.main,
        "&:hover": {
          color: theme.palette.text.primary,
        },
      },
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: theme.palette.text.primary,
      fontSize: "1rem",
    },
  })
);

interface NavbarProps {
  currNavTab: number;
  setNavTab: React.Dispatch<React.SetStateAction<number>>;
}

const NavBar: React.FC<NavbarProps> = ({ currNavTab, setNavTab }) => {
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
      variant="permanent"
      anchor="left"
      color={theme.palette.primary.dark}
      classes={{ paper: classes.paper }}
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
                <ListItemIcon>{item.icon}</ListItemIcon>
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
    component: React.Fragment,
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
];
