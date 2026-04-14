import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { supabase } from "../supabaseClient";
import ReleasesTable from "../components/ReleasesTable";
import ReleasesDetailsPanel from "../components/ReleasesDetailsPanel";

export default function ReleasesPage() {
  const [rows, setRows] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchReleased = async () => {
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select(`
          *,
          customers ( * )
        `)
        .eq("status", "Released");

      if (error) throw error;

      // flatten customer fields into the row
      const flattened = data.map((item) => ({
        ...item,
        ...item.customers,
      }));

      setRows(flattened);
    } catch (err) {
      console.error("Fetch released failed:", err);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchReleased();
  }, []);

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
      {/* Dashboard Header */}
      <Typography variant="h4" gutterBottom>
        Releases Dashboard
      </Typography>

      {/* Dashboard Content */}
      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, minHeight: 0 }}>
        {selectedItem ? (
          <ReleasesDetailsPanel
            releaseItem={selectedItem}
            onBack={() => setSelectedItem(null)}
            refreshData={fetchReleased}
          />
        ) : (
          <ReleasesTable rows={rows} onViewDetails={setSelectedItem} />
        )}
      </Paper>
    </Box>
  );
}