import { CircularProgress, Container } from "@material-ui/core";
import React from "react";
import { APIRecipe } from "./Recipe";
import RecipeEntry from "./RecipeEntry";

interface RecipeTabProps {
  activeTab: number;
  index: number;
  propEntries: APIRecipe[];
  handleOpenEdit: (recipe: APIRecipe, i: number) => void;
  handleRemove?: (recipe: APIRecipe) => void;
  handleLiked?: (i: number) => void;
  handleDetails: (recipe: APIRecipe) => void;
  handleAdd: () => void;
  type: "api" | "fav";
}

// const getKey = (name: string) => {
//   var key = 0;
//   for (let i = 0; i < name.length; i++) {
//     key += name.charCodeAt(i);
//   }

//   return key;
// };

const RecipeTab: React.FC<RecipeTabProps> = ({
  activeTab,
  index,
  propEntries,
  handleOpenEdit,
  handleRemove,
  handleAdd,
  handleLiked,

  handleDetails,
  type,
}) => {
  return (
    <>
      {activeTab === index && (
        <Container
          style={{
            maxWidth: "none",
            textAlign: "center",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
        >
          {propEntries.length > 0 ? (
            propEntries.map((r, i) => {
              return (
                <RecipeEntry
                  type={type}
                  key={r.recipeId}
                  i={i}
                  recipe={r}
                  handleOpenEdit={handleOpenEdit}
                  handleRemove={handleRemove}
                  handleAdd={handleAdd}
                  handleLiked={handleLiked}
                  handleDetails={handleDetails}
                ></RecipeEntry>
              );
            })
          ) : (
            <CircularProgress color="primary" size={100} />
          )}
        </Container>
      )}
    </>
  );
};

export default RecipeTab;
