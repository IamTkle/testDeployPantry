import { Container } from "@material-ui/core";
import { Item } from "./mockEntries";
import React, { ReactNode } from "react";
import InventoryEntry from "./InventoryEntry";

interface InventoryTabProps {
  category?: string;
  activeTab: number;
  propEntries: Item[];
  index: number;
}

const InventoryTab: React.FC<InventoryTabProps> = ({
  activeTab,
  propEntries,
  index,
}) => {
  return (
    <>
      {activeTab === index && (
        <Container>
          {propEntries.map((item) => {
            return (
              <InventoryEntry
                key={item.iid}
                name={item.name}
                expiryGroups={item.expiryGroups}
                quantity={item.quantity}
                category={item.category}
              />
            );
          })}
        </Container>
      )}
    </>
  );
};

const areEqual: (
  prevProps: Readonly<InventoryTabProps & { children?: ReactNode }>,
  nextProps: Readonly<InventoryTabProps & { children?: ReactNode }>
) => boolean = (prevProps, nextProps) => {
  if (
    prevProps.activeTab === nextProps.activeTab &&
    prevProps.propEntries.length === nextProps.propEntries.length
  ) {
    return true;
  }
  return false;
};

const MemoizedInventoryTab = React.memo(InventoryTab, areEqual);
export default MemoizedInventoryTab;
