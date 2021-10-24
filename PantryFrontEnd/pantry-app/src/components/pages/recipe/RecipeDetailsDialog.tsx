import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { isGetAccessor } from "typescript";
import { DOMAIN } from "../../../App";
import { Recipe } from "./mockEntries";

interface RecipeDetailProps {
  dialogOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  dialogRecipeState: [Recipe, React.Dispatch<React.SetStateAction<Recipe>>];
}
const RecipeDetailsDialog: React.FC<RecipeDetailProps> = ({
  dialogOpenState,
  dialogRecipeState,
}) => {
  const [isOpen, setIsOpen] = dialogOpenState;

  const [recipe, setRecipe] = dialogRecipeState;

  const [desc, setDesc] = React.useState("");

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    fetch(DOMAIN + "/api/OnClickRecipe?recipeID=" + recipe.rid, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((resp) =>
      resp.json().then((data) => {
        console.log(data);
        if (resp.ok) setDesc(data.desc);
        else
          enqueueSnackbar("Could not get recipe description!", {
            variant: "error",
          });
      })
    );
  }, [enqueueSnackbar, recipe.rid]);

  return (
    <Dialog
      open={isOpen}
      maxWidth="lg"
      onClose={() => setIsOpen(false)}
      fullWidth
    >
      <DialogTitle>{recipe.name}</DialogTitle>
      <DialogContent>
        <div dangerouslySetInnerHTML={{ __html: desc }}></div>
        <strong>Ingredients: </strong>
        {recipe.ingredients.map((ingr) => (
          <li key={ingr.id}>{ingr.name}</li>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailsDialog;
