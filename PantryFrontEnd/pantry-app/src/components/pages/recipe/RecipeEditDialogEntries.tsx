import {
  ButtonGroup,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from "@material-ui/core";
import { Block, Check, Edit } from "@material-ui/icons";
import { createStyles, useTheme } from "@material-ui/styles";
import React from "react";
import { DOMAIN } from "../../../App";
import { DetailedIngredient_id } from "./Recipe";
import { StyledActionButton } from "./RecipeEntry";

interface EntryProps {
  i: number;
  ig: DetailedIngredient_id;
  handleEdited: (i: number, ing: DetailedIngredient_id) => void;
  handleRemove: (i: number) => void;
  allIngredients: DetailedIngredient_id[];
}

interface APIRecipeItem {
  itemId: string;
  name: string;
  quantity: string;
}
interface RecipeProducts {
  products: APIRecipeItem[];
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
  const theme: Theme = useTheme();
  const classes = useStyles(theme);

  const [editable, setEditable] = React.useState(false);

  const [value, setValue] = React.useState(ig);

  const [products, setProducts] = React.useState<APIRecipeItem[]>([]);

  const handleEdit = React.useCallback(() => {
    if (!editable) setEditable(true);
    else {
      if (value.ingredientId > 0) {
        console.log(value);
        handleEdited(i, { ...value });
        setEditable(false);
      }
    }
  }, [editable, handleEdited, i, value]);

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const ing = allIngredients.find(
        (ing) => ing.ingredientName === e.target.value
      );

      if (ing)
        setValue((prev) => {
          return { ...ing, amount: prev.amount };
        });
      else
        setValue((prev) => {
          return {
            ...prev,
            ingredientName: e.target.value,
            ingredientId: -1,
          };
        });
    },
    [allIngredients]
  );

  const handleSelfDestruct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleRemove(i);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      return { ...prev, amount: parseFloat(e.target.value) };
    });
  };

  React.useEffect(() => {
    if (value.ingredientId <= 0) return;
    const params: RequestInit = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      DOMAIN + "/api/getAllProductsForIng?ingId=" + value.ingredientId,
      params
    )
      .then((resp) =>
        resp.json().then((data: RecipeProducts) => {
          console.log(data);
          setProducts(data.products);
        })
      )
      .catch((e) => console.error(e));
  }, [value.ingredientId]);

  return (
    <ListItem disableGutters>
      <ListItemText
        primary={
          <>
            <TextField
              required
              InputProps={{ className: classes.textFieldRoot }}
              disabled={!editable}
              value={value.ingredientName}
              maxRows={1}
              onChange={handleNameChange}
              inputProps={{ list: "alloptions" }}
              type="text"
            />
            <datalist id="alloptions">
              {allIngredients.map((val, i) => {
                return (
                  <option key={i} value={val.ingredientName}>
                    {val.ingredientName}
                  </option>
                );
              })}
            </datalist>
          </>
        }
        secondary={
          <>
            <ButtonGroup fullWidth={false} disabled={!editable}>
              <TextField
                type="number"
                inputProps={{
                  style: { display: "inline" },
                  min: "0",
                  step: "0.25",
                }}
                style={{ width: "30%" }}
                value={value.amount}
                onChange={handleAmountChange}
                fullWidth={false}
              />
              <StyledActionButton
                fullWidth={false}
                disabled
                size="small"
                style={{
                  backgroundColor: theme.palette.background.default,
                  width: "50%",
                }}
              >
                {value.unitOfMeasure ? value.unitOfMeasure : "unit"}(s)
              </StyledActionButton>
            </ButtonGroup>
            <>
              <TextField
                type="text"
                value={value.linkProduct}
                disabled={!editable}
                onFocus={() => console.log(products)}
                onChange={(e) =>
                  setValue((prev) => {
                    return { ...prev, linkProduct: e.target.value };
                  })
                }
                required
                select
              >
                {products.map((val) => {
                  return (
                    <MenuItem key={val.itemId} value={val.name}>
                      {val.name} {val.quantity}
                    </MenuItem>
                  );
                })}
              </TextField>
            </>
          </>
        }
      />
      <ButtonGroup
        variant="contained"
        fullWidth
        size="large"
        style={{ width: "30%" }}
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
