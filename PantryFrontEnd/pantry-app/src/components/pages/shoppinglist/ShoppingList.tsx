import {
  Container, createStyles, makeStyles, Theme,
  Toolbar, useTheme, Tabs, Tab,Fab
} from "@material-ui/core";
import { Add, Favorite, List } from "@material-ui/icons";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import PantryAppBar from "../../PantryAppBar";
import { browseRecipes, likedRecipes } from "./mockEntries";
import ShoppingListTab from "./ShoppingListTab"

interface RecipeProps {
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
      bottom: theme.spacing(11),
      right: theme.spacing(2),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
);

const ShoppingList: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

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

      <Tabs
        value={activeTab}
        variant="fullWidth"
        onChange={handleTabChange}
        classes={{ root: classes.tabBar, indicator: classes.tabIndicator }}
      >
        <Tab wrapped label="browse" value={0} icon={<List />} />
        <Tab wrapped label="favorites" value={1} icon={<Favorite />} />
      </Tabs>
      <Container style={{ paddingBottom: 16, maxWidth: "none" }}>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={(index) => setActiveTab(index)}
        >
          <ShoppingListTab
            activeTab={activeTab}
            index={0}
            propEntries={browseRecipes}
            key={0}
          />
          <ShoppingListTab
            activeTab={activeTab}
            index={1}
            propEntries={likedRecipes}
            key={1}
          />
        </SwipeableViews>
      </Container>
      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add />
      </Fab>
    </div>
  );
};

export default ShoppingList;