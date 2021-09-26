import {
  AppBar,
  Container,
  Divider,
  Hidden,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import FilterIcon from "@material-ui/icons/TuneOutlined";
import InfoIcon from "@material-ui/icons/Info";
import HamburgerMenuIcon from "@material-ui/icons/Menu";
import React, { ReactNode } from "react";
import { entries, Item } from "./mockEntries";
import InventoryTab from "./InventoryTab";
import { GiFruitBowl as FruitsIcon } from "react-icons/gi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginLeft: theme.spacing(35),
      // backgroundColor: theme.palette.background.default,
      paddingTop: theme.spacing(2),
      height: "auto",
      minHeight: "100vh",
      backgroundColor: "#f1f9f3",
      // backgroundColor: "#f4f2f8",
      // backgroundColor: "#dfedf5",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    root: {
      right: 0,
      top: 0,
      width: "auto",
      borderWidth: 10,
      transition: "width 250ms ease-in-out",
      float: "right",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    appBar: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: `calc(100vw - ${theme.spacing(35)}px)`,
      backgroundColor: theme.palette.background.default,
      // backgroundColor: "#f4f2f8",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      [theme.breakpoints.down("sm")]: {
        width: "100vw",
      },
    },
    title: {
      fontSize: "2rem",
      alignSelf: "center",
      marginRight: "auto",
      marginLeft: theme.spacing(4),
      fontWeight: "bolder",
      letterSpacing: 3,
    },
    tabBar: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "100%",
    },
    titleTypography: {
      [theme.breakpoints.down("sm")]: {
        fontSize: 25,
        marginLeft: theme.spacing(1),
      },
    },
  })
);

interface InventoryProps {
  setNavOpen: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const getTabCategories: () => string[] = () => {
    //need to fetch first in reality

    console.log("categories checked");
    let allCategories: string[] = [];

    entries.forEach((item) => {
      if (!allCategories.includes(item.category)) {
        allCategories.push(item.category);
      }
    });

    return allCategories;
  };

  const filterEntries = (category: string | undefined) => {
    if (category) {
      return entries.filter((item) => {
        return item.category === category ? true : false;
      });
    }
    return entries;
  };

  const [searchIsOpen, setSearchOpen] = React.useState(false);

  const [activeTab, setActiveTab] = React.useState(0);

  const [searchTerm, setSearchTerm] = React.useState("");

  const [searchEntries, setSearchEntries] = React.useState<Item[]>([]);

  const tabCategories = React.useMemo(getTabCategories, []);

  const handleTabChange = (e: React.ChangeEvent<{}>, newTab: number) => {
    setActiveTab(newTab);
  };

  const filterSearchEntries = (searchTerm: string) => {
    return entries.filter((entry) => {
      searchTerm = searchTerm.toLowerCase();
      return entry.name.toLowerCase().includes(searchTerm) ||
        entry.category.toLowerCase().includes(searchTerm)
        ? true
        : false;
    });
  };

  const handleOpenMenu = () => {
    setNavOpen();
  };

  const handleSearchClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (searchIsOpen) {
      setSearchEntries(filterSearchEntries(searchTerm));
      setActiveTab(tabCategories.length + 1);
    } else {
      setSearchOpen(true);
    }
    console.log(searchTerm, filterSearchEntries(searchTerm));
  };

  const getTabs = () => {
    console.log("tab categories checked");
    return tabCategories.map((tab, i) => {
      return (
        <Tab
          wrapped
          key={tab}
          label={tab}
          value={i + 1}
          icon={<FruitsIcon size={29} />}
        />
      );
    });
  };

  const tabs = React.useMemo(getTabs, [tabCategories]);

  const memoizedTabs = React.useMemo(() => {
    console.log("tab contents reloaded");
    return tabCategories.map((category, index) => {
      const filteredEntries = filterEntries(category);
      return (
        <InventoryTab
          key={index + 1}
          activeTab={activeTab}
          index={index + 1}
          propEntries={filteredEntries}
          category={category}
        />
      );
    });
  }, [activeTab, tabCategories]);

  return (
    <div className={classes.container}>
      <AppBar
        color="default"
        variant="elevation"
        position="fixed"
        className={classes.appBar}
        classes={{ root: classes.appBar }}
      >
        <Hidden mdUp>
          <IconButton onClick={handleOpenMenu}>
            <HamburgerMenuIcon />
          </IconButton>
        </Hidden>
        <Typography
          variant={"h2"}
          classes={{ root: classes.titleTypography }}
          color="textPrimary"
          className={classes.title}
        >
          Inventory
        </Typography>
        <TextField
          placeholder="Search for an item"
          label="Search"
          size="medium"
          color="primary"
          variant="outlined"
          classes={{ root: classes.root }}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            classes: {
              // focused: classes.root,
              root: classes.root,
            },
            endAdornment: (
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <IconButton>
          <FilterIcon />
        </IconButton>
      </AppBar>

      <Toolbar />
      <Container disableGutters>
        <Tabs
          value={activeTab}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleTabChange}
          classes={{ root: classes.tabBar }}
        >
          <Tab wrapped label={"All"} value={0} icon={<InfoIcon />} />
          {tabs}
          <Tab
            wrapped
            label={"Search"}
            value={tabCategories.length + 1}
            icon={<InfoIcon />}
          />
        </Tabs>

        <Divider variant="fullWidth" color="primary" />
        <SwipeableViews
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          <InventoryTab activeTab={activeTab} index={0} propEntries={entries} />
          {memoizedTabs}
          <InventoryTab
            activeTab={activeTab}
            index={tabCategories.length + 1}
            propEntries={searchEntries}
          />
        </SwipeableViews>
      </Container>
    </div>
  );
};

const areEqual: (
  prevProps: Readonly<InventoryProps & { children?: ReactNode }>,
  nextProps: Readonly<InventoryProps & { children?: ReactNode }>
) => boolean = (prevProps, nextProps) => {
  console.log("compared functions");
  return true;
};

const MemoizedInventory = React.memo(Inventory, areEqual);
export default MemoizedInventory;
