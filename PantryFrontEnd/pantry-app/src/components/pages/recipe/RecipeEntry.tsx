import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Container,
  createStyles,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  styled,
  Theme,
  useTheme,
} from "@material-ui/core";
import {
  AddShoppingCart,
  Block,
  Edit,
  Favorite,
  ImportContacts,
} from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { DOMAIN } from "../../../App";
import { ingredient_id, APIRecipe, DetailedRecipe } from "./Recipe";

// const useStyles = makeStyles((theme:Theme) => createStyles({

// }))

export const StyledActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  color: theme.palette.background.default,
  backgroundColor: theme.palette.background.default,
  "&:hover": {
    opacity: 0.7,
  },
}));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },

    listItemContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 0,
        paddingInline: 0,
      },
    },

    entryInfoContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
        paddingLeft: 0,
      },
    },

    entryAvatar: {
      aspectRatio: "1.35",
      minWidth: theme.spacing(10),
      height: "100%",
      outline: `3px solid ${theme.palette.secondary.main}`,
      margin: `${theme.spacing(2)}px 0px`,
    },

    actionButtonGroup: {
      [theme.breakpoints.up("md")]: {
        width: "70%",
      },
    },

    favoritedButton: {
      color: "#FF6A85",
      "&:hover": {
        color: "#FF6A85",
        opacity: 0.7,
      },
    },

    editButton: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.main,
      },
      [theme.breakpoints.down("xs")]: {
        borderRadius: 0,
      },
    },

    addButton: {
      backgroundColor: theme.palette.primary.dark,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    removeButton: {
      backgroundColor: theme.palette.error.main,

      "&:hover": {
        backgroundColor: theme.palette.error.main,
      },
    },

    favoriteButton: {
      backgroundColor: "#ee868b",
      "&:hover": {
        backgroundColor: "#ee868b",
      },
    },

    openButton: {
      backgroundColor: theme.palette.text.primary,
      [theme.breakpoints.down("xs")]: {
        borderRadius: 0,
      },
    },
  })
);

interface RecipeEntryProps {
  recipe: APIRecipe;
  handleOpenEdit: (recipe: APIRecipe, i: number) => void;
  handleRemove?: (recipe: APIRecipe) => void;
  handleLiked?: (recipe: APIRecipe, newId: number) => void;
  handleAdd: () => void;
  handleDetails: (recipe: APIRecipe) => void;
  i: number;
  type: "api" | "fav";
}

const RecipeEntry: React.FC<RecipeEntryProps> = ({
  recipe,
  handleOpenEdit,
  handleRemove,
  handleAdd,
  handleLiked,
  handleDetails,
  i,
  type,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const ingredientsString = getIngredientsString(recipe.ingredientsList);

  const { enqueueSnackbar } = useSnackbar();

  const [isLiking, setIsLiking] = React.useState(false);
  const handleEditButtonClick = () => {
    handleOpenEdit(recipe, i);
  };

  const handleRemoveButtonClick = () => {
    if (handleRemove) handleRemove(recipe);
  };

  const handleRecipeLikeClick = () => {
    setIsLiking(true);
    const params: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(DOMAIN + `/api/ApiRecipeToCustom?recipeID=${recipe.recipeId}`, params)
      .then((resp) =>
        resp.json().then((data) => {
          enqueueSnackbar(
            resp.ok
              ? "Recipe added successfully!"
              : "Failed to like reciped! Already exists",
            {
              variant: resp.ok ? "success" : "error",
            }
          );
          if (resp.ok && handleLiked) handleLiked(recipe, data.message);
        })
      )
      .catch((e) =>
        enqueueSnackbar("Failed to add recipe to favorites! " + e, {
          variant: "error",
        })
      )
      .finally(() => setIsLiking(false));
  };

  const handleAddClick = () => {
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
            let products: { itemId: string; count: number }[] = [];

            data.ingredientsList.forEach((ingr) => {
              if (ingr.linkProduct)
                products.push({ itemId: ingr.linkProduct, count: 1 });
            });

            if (products.length > 0)
              fetch(DOMAIN + "/api/AddShoppingItemList", {
                ...params,
                method: "POST",
                body: JSON.stringify(products),
              }).then((addResp) =>
                addResp
                  .json()
                  .then((result) => {
                    if (addResp.ok) {
                      enqueueSnackbar(
                        `${result.message}! Added ${products.length} items to shopping list!`,
                        { variant: "success" }
                      );
                    } else {
                      enqueueSnackbar(
                        "Could not add products to shopping list!",
                        { variant: "error" }
                      );
                    }
                  })
                  .catch((e) =>
                    enqueueSnackbar(
                      "Could not add products to shopping list!" + e,
                      { variant: "error" }
                    )
                  )
              );
            else
              enqueueSnackbar(
                "No links between items and ingredients were found! No items were added",
                { variant: "warning" }
              );
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
  };

  const handleDetailsClick = () => {
    handleDetails(recipe);
  };

  return (
    <Card elevation={3} classes={{ root: classes.cardContainer }}>
      <ListItem classes={{ root: classes.listItemContainer }}>
        <Container classes={{ root: classes.entryInfoContainer }}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              src={recipe.photoUrl}
              classes={{ root: classes.entryAvatar }}
            >
              {recipe.recipeName
                .split(" ")
                .splice(0, 2)
                .map((val) => val.charAt(0).toUpperCase())}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {recipe.recipeName}
              </Container>
            }
            secondary={<Container>{ingredientsString}</Container>}
          />
        </Container>

        <ButtonGroup
          variant="contained"
          size="large"
          fullWidth
          className={classes.actionButtonGroup}
        >
          <StyledActionButton
            className={classes.editButton}
            onClick={handleEditButtonClick}
          >
            <Edit />
          </StyledActionButton>
          <StyledActionButton
            className={classes.addButton}
            onClick={handleAddClick}
          >
            <AddShoppingCart />
          </StyledActionButton>
          {type === "fav" ? (
            <StyledActionButton
              className={classes.removeButton}
              onClick={handleRemoveButtonClick}
            >
              <Block />
            </StyledActionButton>
          ) : (
            <StyledActionButton
              className={classes.favoriteButton}
              onClick={handleRecipeLikeClick}
            >
              {isLiking ? (
                <CircularProgress
                  style={{ color: theme.palette.background.default }}
                  size={theme.spacing(3)}
                />
              ) : (
                <Favorite />
              )}
            </StyledActionButton>
          )}
          <StyledActionButton
            className={classes.openButton}
            onClick={handleDetailsClick}
          >
            <ImportContacts />
          </StyledActionButton>
        </ButtonGroup>
      </ListItem>
    </Card>
  );
};

const getIngredientsString = (ingredients: ingredient_id[]) => {
  var igstr = "";

  var itersCount = 5;

  var plusOthers = true;

  if (ingredients.length <= 5) {
    itersCount = ingredients.length;
    plusOthers = false;
  }

  for (let i = 0; i < itersCount; i++) {
    igstr += ingredients[i]?.name;
    if (i + 1 < itersCount) igstr += ", ";
  }

  if (plusOthers) {
    igstr += ` + ${ingredients.length - 5} more`;
  }

  return igstr;
};

export default RecipeEntry;
