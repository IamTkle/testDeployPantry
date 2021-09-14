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

// all my homies hate comments
type navItem = {
  icon: ReactElement<any, any>;
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

interface NavbarProps {}

const NavBar: React.FC<NavbarProps> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const navItems: navItem[] = [
    {
      descText: "Inventory",
      link: "inventory",
      icon: <InventoryIcon />,
    },

    {
      descText: "Shopping List",
      link: "shoplist",
      icon: <ShoppingListIcon />,
    },

    {
      descText: "Expired Bin",
      link: "expiredbin",
      icon: <ExpiredBinIcon />,
    },

    {
      descText: "Recipes",
      link: "recipes",
      icon: <RecipeIcon />,
    },

    {
      descText: "QR Scan",
      link: "qrscan",
      icon: <QRIcon />,
    },

    {
      descText: "Settings",
      link: "settings",
      icon: <SettingsIcon />,
    },

    {
      descText: "Account",
      link: "account",
      icon: <AccountIcon />,
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
      variant="permanent"
      anchor="left"
      color={theme.palette.primary.dark}
      classes={{ paper: classes.paper }}
    >
      <List component="nav">
        {navItems.map((item, i) => {
          return (
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <ListItem
                button
                selected={selectedNavEle === i}
                onClick={(e) => handleNavClick(e, i)}
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
