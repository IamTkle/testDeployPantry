import { Container } from "@material-ui/core";
import React from "react";
import { ShoppingListEntry as shopListEntry } from "./mockEntries";
import ShoppingListEntry from "./ShoppingListEntry";

interface ShoppingListTabProps {
  activeTab: number;
  index: number;
  // propEntries: shopListEntry[];
  // handleRemove: (shoppingList: shopListEntry) => void;
  // handleAdd: (shoppingList:shopListEntry) => void;
}

// const getKey = (name: string) => {
//   var key = 0;
//   for (let i = 0; i < name.length; i++) {
//     key += name.charCodeAt(i);
//   }

//   return key;
// };

const ShoppingListTab: React.FC<ShoppingListTabProps> = ({
  activeTab,
  index,
  // propEntries,
  // handleRemove,
  // handleAdd,
}) => {
  return (
    <>
      {/* {activeTab === index && (
        <Container style={{ maxWidth: "none" }}>
          {propEntries.map((r, i) => {
            return (
              <ShoppingListEntry
                key={r.rid}
                i={i}
                name={r.name}
                category={r.category}
                shoppingList={r}
                handleRemove={handleRemove}
                handleAdd={handleAdd}
              ></ShoppingListEntry>
            );
          })}
        </Container>
      )} */}
    </>
  );
};

export default ShoppingListTab;
