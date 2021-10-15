import { Container, Fab, Tab, Tabs, Theme, Toolbar } from "@material-ui/core";
import { Add, Favorite, List as ListIcon } from "@material-ui/icons";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import PantryAppBar from "../../PantryAppBar";
import { Recipe } from "../shoppinglist/mockEntries";
import {
  browseRecipes as importedBR,
  likedRecipes as importedLR,
} from "./mockEntries";
import RecipeEditDialog from "./RecipeEditDialog";
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
      bottom: theme.spacing(4),
      right: theme.spacing(4),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  })
);

const RecipePage: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const [browseRecipes, setBrowseRecipes] = React.useState(importedBR);

  const [likedRecipes, setLikedRecipes] = React.useState(importedLR);

  const editDialogOpenState = React.useState(false);

  const dialogRecipeState = React.useState<Recipe | null>(null);

  const [currRecipeIndex, setCurrRecipeIndex] = React.useState(0);

  const [currRecipe, setCurrRecipe] = dialogRecipeState;

  const setEditDialogOpen = editDialogOpenState[1];

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenEdit = (recipe: Recipe, i: number) => {
    setCurrRecipe({ ...recipe });
    setCurrRecipeIndex(i);
    setEditDialogOpen(true);
  };

  const handleRemove = (recipe: Recipe) => {
    setBrowseRecipes((recipes) =>
      recipes.filter((cur) => cur.name !== recipe.name)
    );
    setLikedRecipes((recipes) =>
      recipes.filter((cur) => cur.name !== recipe.name)
    );
  };

  const handleSave = (recipe: Recipe) => {
    setBrowseRecipes((prev) => {
      prev[currRecipeIndex] = recipe;
      return prev;
    });
  };

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

      <Tabs
        value={activeTab}
        variant="fullWidth"
        onChange={handleTabChange}
        classes={{ root: classes.tabBar, indicator: classes.tabIndicator }}
      >
        <Tab wrapped label="browse" value={0} icon={<ListIcon />} />
        <Tab wrapped label="favorites" value={1} icon={<Favorite />} />
      </Tabs>
      {currRecipe && (
        <RecipeEditDialog
          dialogOpenState={editDialogOpenState}
          dialogRecipeState={
            dialogRecipeState as [
              Recipe,
              React.Dispatch<React.SetStateAction<Recipe>>
            ]
          }
          handleSave={handleSave}
        />
      )}
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
            handleOpenEdit={handleOpenEdit}
            handleAdd={() => {}}
            handleRemove={handleRemove}
          />

          <RecipeTab
            activeTab={activeTab}
            index={1}
            propEntries={likedRecipes}
            key={1}
            handleOpenEdit={handleOpenEdit}
            handleAdd={() => {}}
            handleRemove={handleRemove}
          />
        </SwipeableViews>
      </Container>
      <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
        <Add />
      </Fab>
    </div>
  );
};

export default RecipePage;
