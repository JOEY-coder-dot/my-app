import React, { useEffect, useState } from "react";
import { Paper, Button } from "@mui/material";
import { getById } from "../utils/inventory";

export default function InventoryDetailsPanel({ inventoryItem, onBack }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getById(inventoryItem.cs)
      .then((res) => setDetails(res)) // ✅ res is the row object, not { data }
      .catch((err) => {
        console.error("Failed to fetch details:", err);
        setDetails(null);
      });
  }, [inventoryItem.cs]);

  if (!details) return <p>Loading...</p>;

  const detailColumns = [
    { field: "date", headerName: "Invoice Date" },
    { field: "posteddate", headerName: "Posted Date" },
    { field: "cs", headerName: "CS Number" },
    { field: "model", headerName: "Unit Model" },
    { field: "color", headerName: "Color" },
    { field: "year", headerName: "Year Model" },
    { field: "location", headerName: "Location" },
    { field: "chassisnum", headerName: "Chassis No." },
    { field: "enginenum", headerName: "Engine No." },
    { field: "keynum", headerName: "Key No." },
    { field: "weight", headerName: "Weight" },
    { field: "vsp", headerName: "VSP" },
  ];

  const formatValue = (field, value) => {
    if (!value) return "—";
    if (field === "date" || field === "posteddate") {
      return new Date(value).toISOString().split("T")[0]; // YYYY-MM-DD
    }
    return value;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <h2>Inventory Unit: {details.model}</h2>

      {detailColumns.map((col) => (
        <p key={col.field}>
          <strong>{col.headerName}:</strong> {formatValue(col.field, details[col.field])}
        </p>
      ))}
    </Paper>
  );
}