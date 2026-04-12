import React, { useState } from "react";
import InventoryTable from "../components/InventoryTable";
import InventoryDetailsPanel from "../components/InventoryDetailsPanel";

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return selectedItem ? (
    <InventoryDetailsPanel
      inventoryItem={selectedItem}
      onBack={() => setSelectedItem(null)}
    />
  ) : (
    <InventoryTable onViewDetails={setSelectedItem} />
  );
}