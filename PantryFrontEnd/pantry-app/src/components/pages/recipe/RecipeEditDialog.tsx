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
import { ingredient_id, Recipe } from "./mockEntries";
import RecipeEditDialogEntries from "./RecipeEditDialogEntries";

interface RecipeDialogProps {
  dialogOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dialogRecipeState: [Recipe, React.Dispatch<React.SetStateAction<Recipe>>];
  // dialogRecipeState: [Recipe | null, React.Dispatch<React.SetStateAction<Recipe | null>>]
  handleSave: (recipe: Recipe) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveEditButton: {
      color: theme.palette.background.default,
      // backgroundColor: theme.palette.text.secondary,
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
  handleSave,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editDialogOpen, setEditDialog] = dialogOpenState;

  const [dialogRecipe, setDialogRecipe] = dialogRecipeState;

  const [titleEditable, setTitleEditable] = React.useState(false);

  const [initialRecipe] = React.useState(() => {
    return { ...dialogRecipe };
  });

  // NEED UPDATE FOR PRODUCTS
  const isValidRecipe = React.useCallback(() => {
    console.log(
      dialogRecipe.ingredients.every((ingr) => ingr.id > 0),
      dialogRecipe.ingredients
    );
    if (
      dialogRecipe.name &&
      dialogRecipe.ingredients.every((ingr) => ingr.id > 0)
    )
      return true;

    return false;
  }, [dialogRecipe.ingredients, dialogRecipe.name]);

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDialogRecipe((prev) => {
      return { ...prev, name: e.target.value };
    });
  };

  const handleAddItem = () => {
    setDialogRecipe((prev) => {
      prev.ingredients[prev.ingredients.length] = { name: "", id: 0 };
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

  const handleEntryEdited = (i: number, ing: ingredient_id) => {
    setDialogRecipe((prev) => {
      prev.ingredients[i] = ing;
      return { ...prev };
    });
  };

  const handleRemoveEntry = (i: number) => {
    setDialogRecipe((prev) => {
      prev.ingredients.splice(i, 1);
      return { ...prev };
    });
  };

  const [allIngredients, setAllIngredients] = React.useState<ingredient_id[]>(
    []
  );

  React.useEffect(() => {
    fetch(DOMAIN + "/api/AllIngedients", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) =>
        setAllIngredients(
          data.map((val: any) => {
            return { name: val.name, id: val.ingredientId };
          })
        )
      )
      .catch((e) => {
        console.error(e);
        setAllIngredients([
          { name: "Could not get ingredients, please refresh!", id: 123 },
        ]);
      });
  }, []);

  return (
    <Dialog
      open={editDialogOpen}
      maxWidth="lg"
      onClose={() => {
        setEditDialog(false);
        setDialogRecipe(initialRecipe);
      }}
      fullWidth
    >
      <DialogTitle>
        <ClickAwayListener
          onClickAway={() =>
            dialogRecipe.name ? setTitleEditable(false) : null
          }
        >
          <TextField
            required
            value={dialogRecipe.name}
            disabled={!titleEditable}
            //   onBlur={() => (dialogRecipe.name ? setTitleEditable(false) : null)}
            fullWidth
            onChange={handleTitleChange}
            error={!dialogRecipe.name}
            helperText={!dialogRecipe.name ? "Title cannot be blank" : ""}
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
          {dialogRecipe.ingredients.map((ig, i) => {
            return (
              <RecipeEditDialogEntries
                i={i}
                key={ig.id}
                ig={ig}
                allIngredients={allIngredients}
                handleEdited={handleEntryEdited}
                handleRemove={handleRemoveEntry}
              />
            );
          })}
          <MenuItem
            style={{}}
            className={classes.addButton}
            onClick={handleAddItem}
          >
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
