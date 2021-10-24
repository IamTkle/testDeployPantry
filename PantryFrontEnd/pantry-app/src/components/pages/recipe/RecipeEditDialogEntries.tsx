import {
  ButtonGroup,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Block, Check, Edit } from "@material-ui/icons";
import { createStyles, useTheme } from "@material-ui/styles";
import React from "react";
import { DetailedIngredient_id } from "./Recipe";
import { StyledActionButton } from "./RecipeEntry";

interface EntryProps {
  i: number;
  ig: DetailedIngredient_id;
  handleEdited: (i: number, ing: DetailedIngredient_id) => void;
  handleRemove: (i: number) => void;
  allIngredients: DetailedIngredient_id[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editButton: {
      backgroundColor: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: theme.palette.secondary.light,
      },
    },

    removeButton: {
      backgroundColor: theme.palette.error.main,
      "&:hover": {
        backgroundColor: theme.palette.error.light,
      },
    },

    confirmButton: {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.light,
      },
    },

    textFieldRoot: {
      [theme.breakpoints.down("xs")]: {
        // width: theme.spacing(15),
        width: "80%",
      },
    },
  })
);

const RecipeEditDialogEntries: React.FC<EntryProps> = ({
  i,
  ig,
  handleEdited,
  handleRemove,
  allIngredients,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [editable, setEditable] = React.useState(false);

  const [value, setValue] = React.useState(ig);

  const handleEdit = React.useCallback(() => {
    if (!editable) setEditable(true);
    else {
      if (value.ingredientId > 0) {
        handleEdited(i, value);
        setEditable(false);
      }
    }
  }, [editable, handleEdited, i, value]);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const ing = allIngredients.find(
      (ing) => ing.ingredientName === e.target.value
    );

    if (ing) setValue(ing);
    else
      setValue({
        ingredientName: e.target.value,
        ingredientId: -1,
        amount: 0,
        unitOfMeasure: "kg",
      });
  };

  // const handleNameEdited = (
  //   e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  // ) => {
  //   if (value) {
  //     setEditable(false);
  //     handleEdited(i, value);
  //   }
  // };

  const handleSelfDestruct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleRemove(i);
  };

  React.useEffect(() => {
    const ingWithId = allIngredients.find(
      (ing) => ing.ingredientName === ig.ingredientName
    );

    if (ingWithId) {
      setValue(ingWithId);
      handleEdited(i, ingWithId);
    }
  }, [allIngredients, handleEdited, i, ig.ingredientName]);

  // React.useEffect(() => {
  //   handleEdited(i, value);
  // }, [value, i, handleEdited]);

  return (
    <ListItem disableGutters>
      <ListItemText
        primary={
          <>
            <TextField
              // inputProps={{ className: classes.textFieldRoot }}
              required
              InputProps={{ className: classes.textFieldRoot }}
              disabled={!editable}
              value={value.ingredientName}
              maxRows={1}
              onChange={handleNameChange}
              // error={!value.name}
              // helperText={!value.name ? "Field cannot be left empty" : ""}
              inputProps={{ list: "alloptions" }}
              type="text"
              // select
            />
            <datalist id="alloptions">
              {/* <option key={value.id} value={value.name}>
                {value.name}
              </option> */}
              {allIngredients.map((val) => {
                return (
                  <option key={val.ingredientId} value={val.ingredientName}>
                    {val.ingredientName}
                  </option>
                );
              })}
            </datalist>
          </>
        }
      />
      <ButtonGroup
        variant="contained"
        fullWidth
        size="large"
        style={{ width: "40%" }}
      >
        <StyledActionButton
          className={editable ? classes.confirmButton : classes.editButton}
          onClick={handleEdit}
        >
          {!editable ? <Edit /> : <Check />}
        </StyledActionButton>
        <StyledActionButton
          classes={{ root: classes.removeButton }}
          onClick={handleSelfDestruct}
        >
          <Block />
        </StyledActionButton>
      </ButtonGroup>
    </ListItem>
  );
};

export default RecipeEditDialogEntries;
