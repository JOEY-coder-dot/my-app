import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import InventoryTable from "../components/InventoryTable";
import InventoryDetailsPanel from "../components/InventoryDetailsPanel";

export default function InventoryPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Dashboard
      </Typography>

      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, minHeight: 0 }}>
        {selectedItem ? (
          <InventoryDetailsPanel
            inventoryItem={selectedItem}
            onBack={() => setSelectedItem(null)}
          />
        ) : (
          <InventoryTable onViewDetails={setSelectedItem} />
        )}
      </Paper>
    </Box>
  );
}