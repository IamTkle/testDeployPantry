import React, { ReactElement } from "react";
import Drawer from "@material-ui/core/Drawer";
import {
  Button,
  makeStyles,
  Theme,
  Typography,
  useTheme,
  Divider,
  IconButton,
  Box,
} from "@material-ui/core";
import InventoryIcon from "@material-ui/icons/AllInbox";
import ShoppingListIcon from "@material-ui/icons/ShoppingCartOutlined";
import ExpiredBinIcon from "@material-ui/icons/DeleteOutline";
import RecipeIcon from "@material-ui/icons/MenuBookOutlined";
import QRIcon from "@material-ui/icons/CropFreeOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { ClassNameMap, createStyles } from "@material-ui/styles";

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

  return (
    <Drawer
      variant="persistent"
      open={navbarOpen}
      anchor="left"
      color={theme.palette.primary.dark}
      classes={{ paper: classes.paper }}
    >
      {navItems.map((item) => {
        return (
          <Button
            key={item.link}
            size="large"
            variant="contained"
            className={classes.singleTab}
            startIcon={item.icon}
            href={item.link}
            disableElevation
            TouchRippleProps={{ color: theme.palette.primary.dark }}
          >
            <div className={classes.navText}>
              <Typography
                variant="body2"
                component="span"
                style={{ fontWeight: "normal" }}
                color="textPrimary"
              >
                {item.descText}
              </Typography>
            </div>
          </Button>
        );
      })}
    </Drawer>
  );
};

export default NavBar;
