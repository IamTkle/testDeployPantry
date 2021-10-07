import {
  AppBar,
  Container,
  Divider,
  FormControl,
  Hidden,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Switch,
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
import { entries as mockEntries, Item } from "./mockEntries";
import InventoryTab from "./InventoryTab";
import { GiFruitBowl as FruitsIcon } from "react-icons/gi";
import PantryAppBar from "../../PantryAppBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // backgroundColor: "#f4f2f8",
    // backgroundColor: "#dfedf5",
    container: {
      marginLeft: theme.spacing(30),
      paddingTop: theme.spacing(2),
      height: "auto",
      minHeight: "100vh",
      backgroundColor: "#f1f9f3",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },
    textRoot: {
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
      // width: `calc(100vw - ${theme.spacing(30)}px)`,
      width: "auto",
      left: theme.spacing(30),
      backgroundColor: theme.palette.background.default,
      borderBottom: "3px solid " + theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        // width: "100vw",
        left: 0,
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
      color: theme.palette.primary.dark,
      [theme.breakpoints.down("sm")]: {
        fontSize: 25,
        marginLeft: theme.spacing(1),
      },
    },
    searchInput: {
      marginLeft: "auto",
    },
    openMenuButtonContainer: {
      [theme.breakpoints.down("xs")]: {
        marginRight: "auto",
      },
    },
    ascendingTrack: {
      backgroundColor: theme.palette.secondary.main,
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

  const [activeTab, setActiveTab] = React.useState(0);

  const [entries, setEntries] = React.useState(() =>
    sortByExpiry(mockEntries, true)
  );

  const [searchEntries, setSearchEntries] = React.useState<Item[]>([]);

  const tabCategories = React.useMemo(getTabCategories, [entries]);

  const handleTabChange = (e: React.ChangeEvent<{}>, newTab: number) => {
    setActiveTab(newTab);
  };

  const getEntriesForCategory = React.useCallback(
    (category: string | undefined) => {
      if (category) {
        return entries.filter((item) => {
          return item.category === category ? true : false;
        });
      }
      return entries;
    },
    [entries]
  );

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

  const handleSearchClick = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      setSearchEntries(filterSearchEntries(searchTerm));
      setActiveTab(tabCategories.length + 1);
    }
  };

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {
    console.log(desc);
    handleSortTypeChosen(sortType, desc);
  };

  const handleSortTypeChosen = (sortBy: number, desc: boolean) => {
    switch (sortBy) {
      case 0:
        setEntries((prevEntries) => [...sortByExpiry(prevEntries, desc)]);
        break;
      default:
      case 1:
        setEntries((prevEntries) => [...sortByName(prevEntries, desc)]);
        break;
      case 2:
        setEntries((prevEntries) => [...sortByCategory(prevEntries, desc)]);
        break;
      case 3:
        setEntries((prevEntries) => [...sortByQuantity(prevEntries, desc)]);
        break;
    }
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
    return tabCategories.map((category, index) => {
      const filteredEntries = getEntriesForCategory(category);
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
  }, [activeTab, tabCategories, getEntriesForCategory]);

  return (
    <div className={classes.container}>
      <PantryAppBar
        handleOpenMenu={handleOpenMenu}
        handleSearchClick={handleSearchClick}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortTypeChosen={handleSortTypeChosen}
      />
      <Toolbar />

      <Container disableGutters style={{ maxWidth: "none" }}>
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

        <Divider color="primary" />
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

const sortByExpiry = (entries: Item[], desc: boolean) => {
  const sorted = entries.sort((entryA, entryB) => {
    const expGrpsA = entryA.expiryGroups;
    const expGrpsB = entryB.expiryGroups;

    const earliestExpA = expGrpsA.reduce((prev, curr) =>
      prev.expDate < curr.expDate ? prev : curr
    );

    const earliestExpB = expGrpsB.reduce((prev, curr) =>
      prev.expDate < curr.expDate ? prev : curr
    );

    if (desc) return earliestExpA.expDate < earliestExpB.expDate ? -1 : 1;
    return earliestExpA.expDate < earliestExpB.expDate ? 1 : -1;
  });

  console.log(sorted);
  return sorted;
};

const sortByName = (entries: Item[], desc: boolean) => {
  const sorted = entries.sort((A, B) =>
    desc ? A.name.localeCompare(B.name) : A.name.localeCompare(B.name) * -1
  );

  return sorted;
};

const sortByCategory = (entries: Item[], desc: boolean) => {
  const sorted = entries.sort((A, B) =>
    desc
      ? A.category.localeCompare(B.category)
      : A.category.localeCompare(B.category) * -1
  );

  return sorted;
};

const sortByQuantity = (entries: Item[], desc: boolean) => {
  const sorted = entries.sort((A, B) => {
    const expGrpsA = A.expiryGroups;
    const expGrpsB = B.expiryGroups;

    var totalCountA = 0;
    expGrpsA.forEach((eg) => (totalCountA += eg.count));

    var totalCountB = 0;
    expGrpsB.forEach((eg) => (totalCountB += eg.count));

    const diff = totalCountA - totalCountB;

    return desc ? diff : diff * -1;
  });

  return sorted;
};

const MemoizedInventory = React.memo(Inventory, areEqual);
export default MemoizedInventory;
