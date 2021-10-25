import {
  CircularProgress,
  Container,
  Fab,
  Tab,
  Tabs,
  Theme,
  Toolbar,
} from "@material-ui/core";
import { Add, Assistant, Favorite, List as ListIcon } from "@material-ui/icons";
import { createStyles, makeStyles, useTheme } from "@material-ui/styles";
import { useSnackbar } from "notistack";
import React from "react";
import InfiniteScroller from "react-infinite-scroll-component";
import SwipeableViews from "react-swipeable-views";
import { DOMAIN } from "../../../App";
import PantryAppBar, { SORT_TYPES } from "../../PantryAppBar";
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
  linkProduct?: string;
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

  const handleSortDirectionChange = (sortType: SORT_TYPES, desc: boolean) => {};

  const handleSortTypeChosen = (sortType: SORT_TYPES, desc: boolean) => {};

  const [activeTab, setActiveTab] = React.useState(2);

  const [browseRecipes, setBrowseRecipes] = React.useState<APIRecipe[]>([]);

  const [likedRecipes, setLikedRecipes] = React.useState<APIRecipe[]>([]);

  const [recomRecipes, setRecomRecipes] = React.useState<APIRecipe[]>([]);

  const editDialogOpenState = React.useState(false);

  const dialogRecipeState = React.useState<DetailedRecipe | null>(null);

  const detailsDialogOpenState = React.useState(false);

  const [currRecipe, setCurrRecipe] = dialogRecipeState;

  const [isFetching, setIsFetching] = React.useState<boolean[]>([
    true,
    true,
    true,
  ]);

  const setDetailsDialogOpen = detailsDialogOpenState[1];

  const setEditDialogOpen = editDialogOpenState[1];

  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    fetch(DOMAIN + "/api/browseRecipes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => setBrowseRecipes(recipes))
      .catch((e) => console.error(e))
      .finally(() =>
        setIsFetching((prev) => {
          prev[0] = false;
          return [...prev];
        })
      );

    fetch(DOMAIN + "/api/getUserRecipes", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => setLikedRecipes(() => recipes))
      .catch((e) => console.error(e))
      .finally(() =>
        setIsFetching((prev) => {
          prev[1] = false;
          return [...prev];
        })
      );

    fetch(DOMAIN + "/api/testRecipeScoreLogic", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((recipes: APIRecipe[]) => setRecomRecipes(recipes))
      .catch((e) => console.error(e))
      .finally(() =>
        setIsFetching((prev) => {
          prev[2] = false;
          return [...prev];
        })
      );
  }, []);

  const handleLiked = (i: number, newId: number) => {
    let recipeToAdd = browseRecipes[i];

    if (recipeToAdd && newId) {
      recipeToAdd.recipeId = newId;
      setLikedRecipes((prev) => [...prev, recipeToAdd as APIRecipe]);
    }
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
              data.ingredientsList.forEach((ingr) => (ingr.linkProduct = ""));
              console.log(data);
              setCurrRecipe({ ...data });
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

  const handleAddCustomRecipe = () => {
    setActiveTab(1);
    const newRecipe: DetailedRecipe = {
      desc: "",
      ingredientsList: [],
      recipeName: "",
      photoUrl: "",
      recipeId: 0,
      steps: { recipeId: 0, instructions: [] },
    };
    setCurrRecipe(newRecipe);
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
    const params: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...recipe,
        url: null,
        steps: recipe.steps.instructions,
      }),
    };

    fetch(DOMAIN + "/api/addCustomRecipe", params)
      .then((resp) =>
        resp.json().then((data) => {
          if (resp.ok) {
            enqueueSnackbar("Custom recipe created successfully!", {
              variant: "success",
            });
            console.log("New recipe:", data);
            if (parseInt(data.message))
              setLikedRecipes((prev) => [
                ...prev,
                {
                  recipeName: recipe.recipeName,
                  ingredientsList: recipe.ingredientsList.map((val) => {
                    return { name: val.ingredientName, ids: val.ingredientId };
                  }),
                  photoUrl: recipe.photoUrl,
                  recipeId: data.message,
                },
              ]);
            else {
              enqueueSnackbar("Could not create custom recipe!", {
                variant: "error",
              });
            }
            setActiveTab(1);
          } else
            enqueueSnackbar("Could not create custom recipe!", {
              variant: "error",
            });
        })
      )
      .catch((e) => enqueueSnackbar("Error! " + e));
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
            <Tab wrapped label="recommended" value={2} icon={<Assistant />} />
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
            {
              <RecipeTab
                activeTab={activeTab}
                isFetching={isFetching[0] as boolean}
                index={0}
                propEntries={browseRecipes}
                key={0}
                handleOpenEdit={handleOpenEdit}
                handleAdd={() => {}}
                handleLiked={handleLiked}
                handleDetails={handleDetails}
                type="api"
              />
            }

            {
              <RecipeTab
                isFetching={isFetching[1] as boolean}
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
            }

            {
              <RecipeTab
                activeTab={activeTab}
                isFetching={isFetching[1] as boolean}
                index={2}
                key={2}
                type="api"
                propEntries={recomRecipes}
                handleOpenEdit={handleOpenEdit}
                handleLiked={handleLiked}
                handleAdd={() => {}}
                handleDetails={handleDetails}
              />
            }
          </SwipeableViews>
        </Container>
        <Fab
          size="large"
          color="secondary"
          classes={{ root: classes.fab }}
          onClick={handleAddCustomRecipe}
        >
          <Add />
        </Fab>
        <ScrollTopFab topRef={scrollRef} />
      </InfiniteScroller>
    </div>
  );
};

// const sortByName = (entries: APIRecipe[], desc: boolean) => {
//   const sorted = entries.sort((A, B) =>
//     desc ? A.name.localeCompare(B.name) : A.name.localeCompare(B.name) * -1
//   );

//   return sorted;
// };

export default RecipePage;
