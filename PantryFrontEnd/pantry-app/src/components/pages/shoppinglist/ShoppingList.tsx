import {
  Chip, Container, createStyles, Fab, makeStyles, Tabs, Theme,
  Toolbar, useTheme
} from "@material-ui/core";
import { Add, DeleteSweep, DoneAll, PlaylistAdd } from "@material-ui/icons";
import React from "react";
import PantryAppBar from "../../PantryAppBar";
import {
  DOMAIN, listInfo as importedList, shoppingListAPIitem, shoppingListAPIProducts
} from "./mockEntries";
import ShoppingListEntry from "./ShoppingListEntry";

interface ShoppingListProps {
  setNavOpen: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      marginLeft: theme.spacing(30),
      paddingTop: theme.spacing(2),
      height: "auto",
      minHeight: "100vh",
      backgroundColor: "#f1f9f3",
      [theme.breakpoints.down("sm")]: {
        marginLeft: 0,
      },
    },

    tabBar: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "100%",
      position: "sticky",
      zIndex: 10,
      // bottom: 0,
      top: 0,
      [theme.breakpoints.up("md")]: {},
    },

    tabIndicator: {
      bottom: 0,
    },

    fab: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: "#ffb74d",
      },
    },

    fab2: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(15),
      right: theme.spacing(3),
      color: theme.palette.background.default,
      backgroundColor: "#f44336",
      "&:hover": {
        backgroundColor: "#e57373",
      },
    },
    
    fab3: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(3),
      right: theme.spacing(15),
      color: theme.palette.background.default,
      backgroundColor: "#4caf50",
      "&:hover": {
        backgroundColor: "#81c784",
      },
    },

    fab4: {
      position: "fixed",
      zIndex: 5,
      bottom: theme.spacing(11),
      right: theme.spacing(10.5),
      color: theme.palette.background.default,
      backgroundColor: "#616161",
      "&:hover": {
        backgroundColor: "#9e9e9e",
      },
    },
  })
);

const ShoppingList: React.FC<ShoppingListProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};
  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [listInfo, setListInfo] = React.useState(importedList);
  const [listInf, setListInf] = React.useState<shoppingListAPIitem[]>([]);
  const [listProd, setListProd] = React.useState<shoppingListAPIProducts[]>([]);
  const [activeTab, setActiveTab] = React.useState(0);
  
  // const [isFetching, setIsFetching] = React
  // 1015863P

  React.useEffect(() => {
    fetch(DOMAIN + "/api/GetShoppingItems", 
    {method: "GET", credentials: "include", headers: {"Content-Type": "application/json"}} )
    .then((response) => {return response.json()})
    .then((result: shoppingListAPIitem[]) => {setListInf(result); console.log(result)})
    .catch((e) => console.error(e))

    fetch(DOMAIN + "/api/GetShoppingProducts", 
    {method: "GET", credentials: "include", headers: {"Content-Type": "application/json"}} )
    .then((response) => {return response.json()})
    .then((result: shoppingListAPIProducts[]) => {setListProd(result); console.log(result)})
    .catch((e) => console.error(e))
  }, []);

  const handleClearAll = () => {
    if( window.confirm("Are you sure you want to add everything in inventory?")){
        
    };
  }

  const handleManualAdd = () => {

  };

  const handleTabChange = (e: React.ChangeEvent<{}>, newTab: number) => {
    setActiveTab(newTab);
  };
  
  const handleRemove = (shopListAPI: shoppingListAPIitem) => {
    setListInf((shoppingLists) =>
      shoppingLists.filter((cur) => cur.name !== shopListAPI.name)
      );
    };

    const handleAdd = (shopListAPI: shoppingListAPIitem) => {
    setListInf((shoppingLists) =>
      shoppingLists.filter((cur) => cur.name !== shopListAPI.name)
      );
    };

    const getTabCategories: () => string[] = () => {
    //need to fetch first in reality

    console.log("categories checked");
    let allCategories: string[] = [];

    listInf.forEach((item) => {
      if (!allCategories.includes(item.category)) {
        allCategories.push(item.category);
      }
    });

    return allCategories;
  };

  const tabCategories = React.useMemo(getTabCategories, [listInf]);

  const getListInfoForCategory = React.useCallback(
    (category: string | undefined) => {
      if (category) {
        return listInfo.filter((item) => {
          return item.category === category ? true : false;
        });
      }
      return listInfo;
    },
    [listInfo]
  );

  const getTabs = () => {
    console.log("tab categories checked");
    return tabCategories.map((tab, i) => {
      return (
        <Chip
          size="medium"
          clickable
          label={tab}
          onChange={(e) => handleTabChange}
          variant="outlined"
          color="primary"
        />
      );
    });
  };

  const tabs = React.useMemo(getTabs, [tabCategories]);
  
  return (
    <div className={classes.pageContainer}>
      <PantryAppBar
        title={"Shopping List"}
        handleOpenMenu={setNavOpen}
        handleSearchClick={(searchTerm) => console.log(searchTerm)}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortTypeChosen={handleSortTypeChosen}
      />
      <Toolbar />

      <Container disableGutters style={{ maxWidth: "none"  }}>

        <Tabs
          value={activeTab}
          variant="scrollable"
          scrollButtons="on"
          onChange={handleTabChange}
          classes={{ root: classes.tabBar }}
        >
          
          <Chip
          variant="outlined"
          size="medium"
          label="All"
          clickable
          color="primary"
          onClick={() => handleTabChange}
          />
          {/* {tabs} */}
        </Tabs>

      </Container>

      <Container style={{ paddingBottom: 16, maxWidth: "none" }}>
  
          {listInf.map((listInf,i) => { return(
            <ShoppingListEntry 
              i={i}
              item={listInf}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />);
            }
            )
          };
          
      </Container>

      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add onClick={handleManualAdd}/>
      </Fab>

      <Fab size="large" classes={{ root: classes.fab2 }} >
        <DeleteSweep />
      </Fab>
      
      <Fab size="large" classes={{ root: classes.fab3 }} >
        <DoneAll onClick={handleClearAll}/>
      </Fab>

      <Fab size="large" classes={{ root: classes.fab4 }} >
        <PlaylistAdd />
      </Fab>

    </div>
  );
};

export default ShoppingList;