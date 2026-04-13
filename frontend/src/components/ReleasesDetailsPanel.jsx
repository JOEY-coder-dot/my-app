import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import { supabase } from "../supabaseClient";

export default function ReleasesDetailsPanel({ releaseItem, onBack, refreshData }) {
  if (!releaseItem) return null;

  const handleUndeclare = async () => {
    try {
      const { error } = await supabase
        .from("inventory")
        .update({ status: "" }) // or "Available"
        .eq("cs", releaseItem.cs);

      if (error) throw error;

      alert("Unit undeclared and moved back to inventory.");
      await refreshData(); // refresh released list
      onBack();            // close details panel
    } catch (err) {
      console.error("Undeclare failed:", err);
      alert("Failed to undeclare unit.");
    }
  };

  return (
    <Dialog open={true} onClose={onBack} fullWidth maxWidth="sm">
      <DialogTitle>Released Unit Details</DialogTitle>
      <DialogContent>
        <p><strong>CS Number:</strong> {releaseItem.cs}</p>
        <p><strong>Model:</strong> {releaseItem.model}</p>
        <p><strong>Status:</strong> {releaseItem.status}</p>
        <p><strong>Invoice Date:</strong> {releaseItem.date}</p>
        <p><strong>Posted Date:</strong> {releaseItem.posteddate}</p>
        <p><strong>Release Date:</strong> {releaseItem.date_tagged}</p>
        <hr />
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {releaseItem.customername}</p>
        <p><strong>MP Name:</strong> {releaseItem.mpname}</p>
        <p><strong>Customer Address:</strong> {releaseItem.customeraddress}</p>

        <Button onClick={onBack} variant="outlined" sx={{ mt: 2, mr: 2 }}>
          Back
        </Button>
        <Button onClick={handleUndeclare} variant="contained" color="warning" sx={{ mt: 2 }}>
          Undeclare
        </Button>
      </DialogContent>
    </Dialog>
  );
}