import { Container } from "@material-ui/core";
import React from "react";
import { Recipe, List } from "./mockEntries";
import ShoppingListEntry from "./ShoppingListEntry";

interface ShoppingListTabProps {
  activeTab: number;
  index: number;
  propEntries: List[];
}

const ShoppingListTab: React.FC<ShoppingListTabProps> = ({
  activeTab,
  index,
  propEntries,
}) => {
  return (
    <>
      {activeTab === index && (
        <Container style={{ maxWidth: "none" }}>
          {propEntries.map((r, i) => {
            return (
              // <ShoppingListEntry
              //   key={i}
              //   ingredients={r.ingredients}
              //   name={r.name}
              //   recipeID={r.rid}
              //   img={r.img}
              //   fav={r.fav}
              // ></ShoppingListEntry>
              <ShoppingListEntry
                key={i}
                recipeID={r.rid}
                name={r.name}
                category={r.category}
                intake={r.intake}
                price={r.price}
                img={r.img}
              ></ShoppingListEntry>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default ShoppingListTab;
