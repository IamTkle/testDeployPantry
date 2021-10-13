import {
  Container,
  Dialog,
  Fab,
  Tab,
  Tabs,
  Theme,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { Add, Favorite, List } from "@material-ui/icons";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import PantryAppBar from "../../PantryAppBar";
import { browseRecipes, likedRecipes } from "./mockEntries";
import RecipeTab from "./RecipeTab";

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

const Recipe: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const fullScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [editDialogOpen, setEditDialog] = React.useState(false);

  return (
    <div className={classes.pageContainer}>
      <PantryAppBar
        title={"Recipes"}
        handleOpenMenu={setNavOpen}
        handleSearchClick={(searchTerm) => console.log(searchTerm)}
        handleSortDirectionChange={handleSortDirectionChange}
        handleSortTypeChosen={handleSortTypeChosen}
      />
      <Toolbar />

      <Dialog
        fullScreen={fullScreen}
        open={editDialogOpen}
        onClose={() => setEditDialog(false)}
      >
        helloThere
      </Dialog>

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
          <RecipeTab
            activeTab={activeTab}
            index={0}
            propEntries={browseRecipes}
            key={0}
            openDialog={() => setEditDialog(true)}
          />
          <RecipeTab
            activeTab={activeTab}
            index={1}
            propEntries={likedRecipes}
            key={1}
            openDialog={() => setEditDialog(true)}
          />
        </SwipeableViews>
      </Container>
      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add />
      </Fab>
    </div>
  );
};

export default Recipe;
