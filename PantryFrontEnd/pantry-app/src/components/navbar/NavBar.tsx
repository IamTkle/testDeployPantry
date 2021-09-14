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

// interface params {
//   useStyles: () => ClassNameMap;
// }

type navItem = {
  icon: ReactElement<any, any>;
  descText: string;
  link: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    singleTab: {
      display: "flex",
      flexDireciton: "column",
      justifyContent: "space-around",
      alignItems: "center",
      padding: theme.spacing(4),
      borderRadius: 8,
      backgroundColor: "white",
      "&:nth-child(5n)": {
        marginTop: "auto",
      },
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
      // backgroundColor: theme.palette.primary.dark,
    },
    paper: {
      background: theme.palette.text.secondary,
      width: theme.spacing(30),
      padding: "1rem 1rem",
    },
    navText: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
    },
    root: {
      "&.Mui-selected": {
        backgroundColor: theme.palette.primary.light,
      },
    },
    selected: {
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

interface NavbarProps {
  navbarOpen: boolean;
}

const NavBar: React.FC<NavbarProps> = ({ navbarOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const navItems: navItem[] = [
    {
      descText: "Inventory",
      link: "inventory",
      icon: <InventoryIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "Shopping List",
      link: "shoplist",
      icon: <ShoppingListIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "Expired Bin",
      link: "expiredbin",
      icon: <ExpiredBinIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "Recipes",
      link: "recipes",
      icon: <RecipeIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "QR Scan",
      link: "qrscan",
      icon: <QRIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "Settings",
      link: "settings",
      icon: <SettingsIcon htmlColor={theme.palette.text.primary} />,
    },

    {
      descText: "Account",
      link: "account",
      icon: <AccountIcon htmlColor={theme.palette.text.primary} />,
    },
  ];

  const [selectedNavEle, setSelectedNavEle] = React.useState(0);

  const handleNavClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    i: number
  ) => {
    setSelectedNavEle(i);
  };

  return (
    <Drawer
      variant="persistent"
      open={navbarOpen}
      anchor="left"
      color={theme.palette.primary.dark}
      classes={{ paper: classes.paper }}
    >
      <List component="nav">
        {navItems.map((item, i) => {
          return (
            <ListItem
              button
              selected={selectedNavEle === i}
              alignItems="center"
              onClick={(e) => handleNavClick(e, i)}
              classes={{ selected: classes.root }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.descText} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavBar;
