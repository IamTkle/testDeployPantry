import {
  Button,
  ClickAwayListener,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
  useTheme,
} from "@material-ui/core";
import { AddBox, Edit } from "@material-ui/icons";
import React from "react";
import { DOMAIN } from "../../../App";
import { DetailedIngredient_id, DetailedRecipe } from "./Recipe";
import RecipeEditDialogEntries from "./RecipeEditDialogEntries";

interface RecipeDialogProps {
  dialogOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dialogRecipeState: [
    DetailedRecipe,
    React.Dispatch<React.SetStateAction<DetailedRecipe>>
  ];
  resetDialogRecipe: () => void;
  handleSave: (recipe: DetailedRecipe) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveEditButton: {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.primary.dark,

      margin: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },

    addButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
      width: "auto",
      marginBlock: theme.spacing(5),
      marginInline: theme.spacing(5),
    },
  })
);

// const areEqual = (rA: Recipe, rB: Recipe) => {
//   if (
//     rA.name === rB.name &&
//     rA.ingredients.every((ingr, i) => ingr === rB.ingredients[i])
//   )
//     return true;
//   return false;
// };

const RecipeEditDialog: React.FC<RecipeDialogProps> = ({
  dialogOpenState,
  dialogRecipeState,
  resetDialogRecipe,
  handleSave,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editDialogOpen, setEditDialog] = dialogOpenState;

  const [dialogRecipe, setDialogRecipe] = dialogRecipeState;

  const [titleEditable, setTitleEditable] = React.useState(false);

  const [allIngredients, setAllIngredients] = React.useState<
    DetailedIngredient_id[]
  >([]);

  // const [initialRecipe] = React.useState(() => {
  //   return { ...dialogRecipe };
  // });

  // NEED UPDATE FOR PRODUCTS
  const isValidRecipe = React.useCallback(() => {
    console.log(
      dialogRecipe.ingredientsList.every((ingr) => ingr.ingredientId > 0),
      dialogRecipe.ingredientsList
    );
    if (
      dialogRecipe.recipeName &&
      dialogRecipe.ingredientsList.every((ingr) => ingr.ingredientId > 0)
    )
      return true;

    return false;
  }, [dialogRecipe.ingredientsList, dialogRecipe.recipeName]);

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDialogRecipe((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleAddItem = () => {
    setDialogRecipe((prev) => {
      prev.ingredientsList[prev.ingredientsList.length] = {
        ingredientName: "",
        ingredientId: 0,
        unitOfMeasure: "kg",
        amount: 0,
      };
      return { ...prev };
    });
  };

  const handleSaveDialog = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isValidRecipe()) {
      handleSave(dialogRecipe);
      setEditDialog(false);
    }
  };

  const handleEntryEdited = React.useCallback(
    (i: number, ing: DetailedIngredient_id) => {
      setDialogRecipe((prev) => {
        prev.ingredientsList[i] = ing;
        return { ...prev };
      });
    },
    [setDialogRecipe]
  );

  const handleRemoveEntry = (i: number) => {
    setDialogRecipe((prev) => {
      prev.ingredientsList.splice(i, 1);
      return { ...prev };
    });
  };

  React.useEffect(() => {
    fetch(DOMAIN + "/api/AllIngedients", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) =>
        setAllIngredients(
          data.map((val: DetailedIngredient_id) => {
            return {
              ingredientId: val.ingredientId,
              ingredientName: val.ingredientName,
              unitOfMeasure: "kg",
              amount: 0,
            };
          })
        )
      )
      .catch((e) => {
        console.error(e);
        setAllIngredients([
          {
            ingredientName: "Could not get ingredients, please refresh!",
            ingredientId: -1,
            amount: 0,
            unitOfMeasure: "kg",
          },
        ]);
      });
  }, []);

  return (
    <Dialog
      open={editDialogOpen}
      maxWidth="md"
      onClose={() => {
        setEditDialog(false);
        setTitleEditable(false);
        resetDialogRecipe();
      }}
      fullWidth
    >
      <DialogTitle>
        <ClickAwayListener
          onClickAway={() =>
            dialogRecipe.recipeName ? setTitleEditable(false) : null
          }
        >
          <TextField
            required
            value={dialogRecipe.recipeName}
            disabled={!titleEditable}
            fullWidth
            onChange={handleTitleChange}
            error={!dialogRecipe.recipeName}
            helperText={!dialogRecipe.recipeName ? "Title cannot be blank" : ""}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setTitleEditable(true)}
                  color={titleEditable ? "primary" : "default"}
                >
                  <Edit />
                </IconButton>
              ),
            }}
          />
        </ClickAwayListener>
      </DialogTitle>

      <DialogContent>
        <List>
          {dialogRecipe.ingredientsList.map((ig, i) => {
            return (
              <RecipeEditDialogEntries
                i={i}
                key={ig.ingredientId}
                ig={ig}
                allIngredients={allIngredients}
                handleEdited={handleEntryEdited}
                handleRemove={handleRemoveEntry}
              />
            );
          })}
          <MenuItem className={classes.addButton} onClick={handleAddItem}>
            <AddBox />
          </MenuItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.saveEditButton}
          variant="contained"
          onClick={handleSaveDialog}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeEditDialog;
