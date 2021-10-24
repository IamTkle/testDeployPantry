import {
  ButtonGroup,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { Block, Edit } from "@material-ui/icons";
import { createStyles, useTheme } from "@material-ui/styles";
import React from "react";
import { ingredient_id } from "./RecipeEditDialog";
import { StyledActionButton } from "./RecipeEntry";

interface EntryProps {
  i: number;
  ig: string;
  handleEdited: (i: number, name: string) => void;
  handleRemove: (i: number) => void;
  allIngredients: ingredient_id[];
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

  const handleEdit = () => {
    setEditable(true);
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const handleNameEdited = (
    e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (value) {
      setEditable(false);
      handleEdited(i, value);
    }
  };

  const handleSelfDestruct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleRemove(i);
  };

  return (
    <ListItem disableGutters>
      <ListItemText
        primary={
          <TextField
            // inputProps={{ className: classes.textFieldRoot }}
            required
            InputProps={{ className: classes.textFieldRoot }}
            disabled={!editable}
            value={value}
            maxRows={1}
            onChange={handleNameChange}
            onBlur={handleNameEdited}
            error={!value}
            helperText={!value ? "Field cannot be left empty" : ""}
            select
          >
            {allIngredients.map((val) => {
              return (
                <option key={val.id} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </TextField>
        }
      />
      <ButtonGroup
        variant="contained"
        fullWidth
        size="large"
        style={{ width: "40%" }}
      >
        <StyledActionButton
          classes={{ root: classes.editButton }}
          onClick={handleEdit}
        >
          <Edit />
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
