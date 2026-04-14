import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import CustomersTable from "../components/CustomersTable";
import CustomerDetailsPanel from "../components/CustomerDetailsPanel";

export default function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      {/* Dashboard Header */}
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>

      {/* Dashboard Content */}
      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, minHeight: 0 }}>
        {selectedCustomer ? (
          <CustomerDetailsPanel
            customer={selectedCustomer}
            onBack={() => setSelectedCustomer(null)}
          />
        ) : (
          <CustomersTable onViewDetails={setSelectedCustomer} />
        )}
      </Paper>
    </Box>
  );
}