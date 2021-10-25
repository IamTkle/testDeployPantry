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
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { AddBox, Edit, RemoveFromQueue } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React from "react";
import { DOMAIN } from "../../../App";
import { DetailedIngredient_id, DetailedRecipe, ingredient_id } from "./Recipe";
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

interface CustomIngredient extends ingredient_id {
  unitOfMeasure: string;
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

    removeButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: theme.palette.error.dark,
      backgroundColor: theme.palette.error.light,
      width: "auto",
      marginBlock: theme.spacing(5),
      marginInline: theme.spacing(5),
    },

    stepsList: {
      listStyleType: "decimal",
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
  //STYLES
  const theme = useTheme();
  const classes = useStyles(theme);

  // STATES
  const [editDialogOpen, setEditDialog] = dialogOpenState;

  const [dialogRecipe, setDialogRecipe] = dialogRecipeState;

  const [titleEditable, setTitleEditable] = React.useState(false);

  const [allIngredients, setAllIngredients] = React.useState<
    DetailedIngredient_id[]
  >([]);

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { enqueueSnackbar } = useSnackbar();

  // NEED UPDATE FOR PRODUCTS
  const isValidRecipe = React.useCallback(() => {
    console.log(
      dialogRecipe.ingredientsList.every((ingr) => ingr.ingredientId > 0),
      dialogRecipe
    );
    if (
      dialogRecipe.recipeName &&
      dialogRecipe.ingredientsList.every((ingr) => ingr.ingredientId > 0)
    )
      return true;

    return false;
  }, [dialogRecipe]);

  const handleTitleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setDialogRecipe((prev) => {
        return { ...prev, recipeName: e.target.value };
      });
    },
    [setDialogRecipe]
  );

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
    } else {
      enqueueSnackbar("Recipe is not valid!", { variant: "error" });
    }
  };

  const handleEntryEdited = React.useCallback(
    (i: number, ing: DetailedIngredient_id) => {
      setDialogRecipe((prev) => {
        prev.ingredientsList[i] = { ...ing };
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

  const handleClose = () => {
    setEditDialog(false);
    setTitleEditable(false);
    resetDialogRecipe();
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
          data.map((val: CustomIngredient) => {
            return {
              ingredientId: val.ids,
              ingredientName: val.name,
              unitOfMeasure: val.unitOfMeasure,
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
      fullScreen={fullScreen}
      onClose={handleClose}
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
            // label="Title"
            placeholder="Title"
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
        <TextField
          label="Description"
          multiline
          fullWidth
          variant="outlined"
          value={dialogRecipe.desc}
          onChange={(e) =>
            setDialogRecipe((prev) => {
              return { ...prev, desc: e.target.value };
            })
          }
        ></TextField>
        <List classes={{ root: classes.stepsList }}>
          <label>Steps</label>
          {dialogRecipe.steps.instructions.map((val, i) => {
            return (
              <li
                style={{
                  marginBlock: theme.spacing(3),
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  multiline
                  variant="filled"
                  key={i}
                  value={val}
                  inputProps={{ style: { display: "block" } }}
                  onChange={(e) =>
                    setDialogRecipe((prev) => {
                      prev.steps.instructions[i] = e.target.value;
                      return { ...prev };
                    })
                  }
                />
              </li>
            );
          })}
          <MenuItem
            className={classes.addButton}
            onClick={() =>
              setDialogRecipe((prev) => {
                prev.steps.instructions.push("New step");
                return { ...prev };
              })
            }
          >
            <AddBox />
          </MenuItem>
          <MenuItem
            className={classes.removeButton}
            onClick={() =>
              setDialogRecipe((prev) => {
                prev.steps.instructions.pop();
                return { ...prev };
              })
            }
          >
            <RemoveFromQueue />
          </MenuItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          style={{
            visibility: fullScreen ? "visible" : "hidden",
            marginRight: "auto",
          }}
          color="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
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
