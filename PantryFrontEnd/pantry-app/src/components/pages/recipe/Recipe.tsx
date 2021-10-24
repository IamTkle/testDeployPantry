import {
  CircularProgress,
  Container,
  Fab,
  Tab,
  Tabs,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { Add, Favorite, List as ListIcon } from "@material-ui/icons";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import { useSnackbar } from "notistack";
import React from "react";
import InfiniteScroller from "react-infinite-scroll-component";
import SwipeableViews from "react-swipeable-views";
import { DOMAIN } from "../../../App";
import PantryAppBar from "../../PantryAppBar";
import ScrollTopFab from "../../ScrollTopFab";
import { Recipe } from "../recipe/mockEntries";
import RecipeDetailsDialog from "./RecipeDetailsDialog";
// import { likedRecipes as importedLR } from "./mockEntries";
import RecipeEditDialog from "./RecipeEditDialog";
import RecipeTab from "./RecipeTab";

interface RecipeProps {
  setNavOpen: () => void;
}

interface APIRecipe {
  ingredientsList: string[];
  photoUrl: string;
  recipeName: string;
  recipeId: number;
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
      overflow: "hidden",
    },

    tabBar: {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "100%",
      position: "sticky",
      zIndex: 10,
      // bottom: 0,
      top: 0,
    },

    tabIndicator: {
      bottom: 0,
    },

    fab: {
      position: "fixed",
      zIndex: 15,
      bottom: theme.spacing(4),
      right: theme.spacing(4),
      color: theme.palette.background.default,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    centerFlexContainer: {
      display: "flex",
      justifyContent: "center",
    },
  })
);

const RecipePage: React.FC<RecipeProps> = ({ setNavOpen }) => {
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const handleSortDirectionChange = (sortType: number, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: number, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(0);

  const [browseRecipes, setBrowseRecipes] = React.useState<Recipe[]>([]);

  const [likedRecipes, setLikedRecipes] = React.useState<Recipe[]>([]);

  const editDialogOpenState = React.useState(false);

  const dialogRecipeState = React.useState<Recipe | null>(null);

  const detailsDialogOpenState = React.useState(false);

  const [currRecipeIndex, setCurrRecipeIndex] = React.useState(0);

  const [currRecipe, setCurrRecipe] = dialogRecipeState;

  const setDetailsDialogOpen = detailsDialogOpenState[1];

  const setEditDialogOpen = editDialogOpenState[1];

  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    fetch(DOMAIN + "/api/getUserRecipes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => {
        setLikedRecipes(
          recipes.map((r) => {
            const recipe: Recipe = {
              img: r.photoUrl,
              ingredients: r.ingredientsList.map((value, i) => {
                return { name: value, id: i };
              }),
              rid: r.recipeId,
              name: r.recipeName,
            };
            return recipe;
          })
        );
      })
      .catch((e) => console.error(e));

    fetch(DOMAIN + "/api/browseRecipes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => {
        setBrowseRecipes(
          recipes.map((r) => {
            const recipe: Recipe = {
              img: r.photoUrl,
              ingredients: r.ingredientsList.map((value, i) => {
                return { name: value, id: i };
              }),
              rid: r.recipeId,
              name: r.recipeName,
            };
            return recipe;
          })
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const handleLiked = (i: number) => {
    const recipeToAdd = browseRecipes[i];

    if (recipeToAdd) setLikedRecipes((prev) => [...prev, recipeToAdd]);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);

    if (browseRecipes.length > 20)
      setBrowseRecipes((prev) => {
        return [...prev].splice(0, 20);
      });
  };

  const handleOpenEdit = (recipe: Recipe, i: number) => {
    setCurrRecipe({ ...recipe });
    setCurrRecipeIndex(i);
    setEditDialogOpen(true);
  };

  const handleRemove = (recipe: Recipe) => {
    fetch(DOMAIN + "/api/RemoveFave?RecipeId=" + recipe.rid, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) =>
        resp.json().then((data) => {
          if (resp.ok) {
            enqueueSnackbar(data.message, { variant: "success" });
            setLikedRecipes((recipes) =>
              recipes.filter((cur) => cur.name !== recipe.name)
            );
          } else enqueueSnackbar(data.message, { variant: "error" });
        })
      )
      .catch((e) => {
        enqueueSnackbar("Failed to remove recipe!", { variant: "error" });
        console.error(e);
      });
  };

  const handleSave = (recipe: Recipe) => {
    setBrowseRecipes((prev) => {
      prev[currRecipeIndex] = recipe;
      return prev;
    });
  };

  const handleDetails = (recipe: Recipe) => {
    setCurrRecipe({ ...recipe });
    setDetailsDialogOpen(true);
  };

  const handleFetchNext = () => {
    fetch(DOMAIN + "/api/browseRecipes?index=" + browseRecipes.length, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => {
        setBrowseRecipes((prev) => [
          ...prev,
          ...recipes.map((r) => {
            const recipe: Recipe = {
              img: r.photoUrl,
              ingredients: r.ingredientsList.map((value, i) => {
                return { name: value, id: i };
              }),
              rid: r.recipeId,
              name: r.recipeName,
            };
            return recipe;
          }),
        ]);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={classes.pageContainer} ref={scrollRef}>
      <InfiniteScroller
        dataLength={browseRecipes.length}
        hasMore={activeTab === 0 ? true : false}
        loader={
          <Container className={classes.centerFlexContainer}>
            <CircularProgress size={theme.spacing(10)} />
          </Container>
        }
        next={activeTab === 0 ? handleFetchNext : () => {}}
        style={{ overflow: "unset" }}
        // scrollableTarget={document.body}
      >
        <PantryAppBar
          title={"Recipes"}
          handleOpenMenu={setNavOpen}
          handleSearchClick={(searchTerm) => console.log(searchTerm)}
          handleSortDirectionChange={handleSortDirectionChange}
          handleSortTypeChosen={handleSortTypeChosen}
        />
        <Toolbar />

        <Container disableGutters style={{ maxWidth: "none" }}>
          <Tabs
            value={activeTab}
            variant="fullWidth"
            onChange={handleTabChange}
            classes={{
              root: classes.tabBar,
              indicator: classes.tabIndicator,
            }}
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
          {currRecipe && (
            <RecipeDetailsDialog
              dialogOpenState={detailsDialogOpenState}
              dialogRecipeState={
                dialogRecipeState as [
                  Recipe,
                  React.Dispatch<React.SetStateAction<Recipe>>
                ]
              }
            />
          )}
        </Container>
        <Container
          disableGutters
          style={{ paddingBottom: 16, maxWidth: "none" }}
        >
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
              handleLiked={handleLiked}
              handleDetails={handleDetails}
              type="api"
            />

            <RecipeTab
              activeTab={activeTab}
              index={1}
              propEntries={likedRecipes}
              key={1}
              handleOpenEdit={handleOpenEdit}
              handleAdd={() => {}}
              handleRemove={handleRemove}
              handleDetails={handleDetails}
              type="fav"
            />
          </SwipeableViews>
        </Container>
        <Fab size="large" color="secondary" classes={{ root: classes.fab }}>
          <Add />
        </Fab>
        <ScrollTopFab topRef={scrollRef} />
      </InfiniteScroller>
    </div>
  );
};

export default RecipePage;
