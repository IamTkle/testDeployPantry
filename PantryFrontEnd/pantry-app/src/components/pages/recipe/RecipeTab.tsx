import { Container } from "@material-ui/core";
import React from "react";
import { Recipe } from "./mockEntries";
import RecipeEntry from "./RecipeEntry";

interface RecipeTabProps {
  activeTab: number;
  index: number;
  propEntries: Recipe[];
  handleOpenEdit: (recipe: Recipe) => void;
  handleRemove: (recipe: Recipe) => void;
  handleAdd: () => void;
}

const RecipeTab: React.FC<RecipeTabProps> = ({
  activeTab,
  index,
  propEntries,
  handleOpenEdit,
  handleRemove,
  handleAdd,
}) => {
  return (
    <>
      {activeTab === index && (
        <Container style={{ maxWidth: "none" }}>
          {propEntries.map((r, i) => {
            return (
              <RecipeEntry
                key={i}
                // ingredients={r.ingredients}
                // name={r.name}
                // recipeID={r.rid}
                // img={r.img}
                // fav={r.fav}
                recipe={r}
                handleOpenEdit={handleOpenEdit}
                handleRemove={handleRemove}
                handleAdd={handleAdd}
              ></RecipeEntry>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default RecipeTab;
