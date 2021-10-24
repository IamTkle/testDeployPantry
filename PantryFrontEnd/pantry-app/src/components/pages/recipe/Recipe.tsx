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
import RecipeDetailsDialog from "./RecipeDetailsDialog";
import RecipeEditDialog from "./RecipeEditDialog";
import RecipeTab from "./RecipeTab";

interface RecipeProps {
  setNavOpen: () => void;
}

export interface APIRecipe {
  ingredientsList: ingredient_id[];
  photoUrl: string;
  recipeName: string;
  recipeId: number;
}

export interface ingredient_id {
  name: string;
  ids: number;
}

export interface DetailedIngredient_id {
  ingredientId: number;
  ingredientName: string;
  unitOfMeasure: string;
  amount: number;
}

interface IngredientSteps {
  recipeId: number;
  instructions: string[];
}

export interface DetailedRecipe extends Omit<APIRecipe, "ingredientsList"> {
  ingredientsList: DetailedIngredient_id[];
  desc: string;
  steps: IngredientSteps;
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

  const [browseRecipes, setBrowseRecipes] = React.useState<APIRecipe[]>([]);

  const [likedRecipes, setLikedRecipes] = React.useState<APIRecipe[]>([]);

  const editDialogOpenState = React.useState(false);

  const dialogRecipeState = React.useState<DetailedRecipe | null>(null);

  const detailsDialogOpenState = React.useState(false);

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
      .then((recipes: APIRecipe[]) => setLikedRecipes(() => recipes))
      .catch((e) => console.error(e));

    fetch(DOMAIN + "/api/browseRecipes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => setBrowseRecipes(recipes))
      .catch((e) => console.error(e));
  }, []);

  const handleLiked = (i: number) => {
    const recipeToAdd = browseRecipes[i];

    if (recipeToAdd) setLikedRecipes((prev) => [...prev, recipeToAdd]);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (browseRecipes.length > 20)
      setBrowseRecipes((prev) => {
        return [...prev].splice(0, 20);
      });
    setActiveTab(newValue);
  };

  const handleFetchDetailedRecipe = React.useCallback(
    (recipe: APIRecipe) => {
      const params: RequestInit = {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      };

      fetch(
        DOMAIN + "/api/getFullDetailsRecipe?recipeId=" + recipe.recipeId,
        params
      )
        .then((resp) =>
          resp.json().then((data: DetailedRecipe) => {
            if (resp.ok) {
              setCurrRecipe(data);
            } else
              enqueueSnackbar("Could not get recipe details!", {
                variant: "error",
              });
          })
        )
        .catch((e) => {
          enqueueSnackbar("Error! " + e, { variant: "error" });
          console.error(e);
        });
    },
    [enqueueSnackbar, setCurrRecipe]
  );

  const handleOpenEdit = (recipe: APIRecipe, i: number) => {
    // setCurrRecipe({ ...recipe });
    handleFetchDetailedRecipe(recipe);
    setEditDialogOpen(true);
  };

  const handleRemove = (recipe: APIRecipe) => {
    fetch(DOMAIN + "/api/RemoveFave?RecipeId=" + recipe.recipeId, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) =>
        resp.json().then((data) => {
          if (resp.ok) {
            enqueueSnackbar(data.message, { variant: "success" });
            setLikedRecipes((recipes) =>
              recipes.filter((cur) => cur.recipeName !== recipe.recipeName)
            );
          } else enqueueSnackbar(data.message, { variant: "error" });
        })
      )
      .catch((e) => {
        enqueueSnackbar("Failed to remove recipe!", { variant: "error" });
        console.error(e);
      });
  };

  const handleSave = (recipe: DetailedRecipe) => {
    // setBrowseRecipes((prev) => {
    //   prev[currRecipeIndex] = recipe;
    //   return prev;
    // });
  };

  const handleDetails = (recipe: APIRecipe) => {
    handleFetchDetailedRecipe(recipe);
    setDetailsDialogOpen(true);
  };

  const handleFetchNext = () => {
    fetch(DOMAIN + "/api/browseRecipes?index=" + browseRecipes.length, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => {
        setBrowseRecipes((prev) => [...prev, ...recipes]);
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
              resetDialogRecipe={() => dialogRecipeState[1](null)}
              dialogOpenState={editDialogOpenState}
              dialogRecipeState={
                dialogRecipeState as [
                  DetailedRecipe,
                  React.Dispatch<React.SetStateAction<DetailedRecipe>>
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
                  DetailedRecipe,
                  React.Dispatch<React.SetStateAction<DetailedRecipe>>
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
