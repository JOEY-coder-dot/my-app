import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { supabase } from "../supabaseClient"; // ✅ adjust import if needed
import { update } from "../utils/inventory";        // inventory update util

export default function EditDialog({ open, setOpen, row, setRow, onSave }) {
  if (!row) return null;

  const handleChange = (field) => (e) => {
    setRow({ ...row, [field]: e.target.value });
  };

  // ✅ Auto-clear "Hold" if it has lapsed more than 1 day
  useEffect(() => {
    if (row.status === "Hold" && row.date_tagged) {
      const taggedDate = new Date(row.date_tagged);
      const now = new Date();
      const diffDays = (now - taggedDate) / (1000 * 60 * 60 * 24);

      if (diffDays >= 1) {
        setRow({ ...row, status: "", date_tagged: null });
      }
    }
  }, [row, setRow]);

  const handleSave = async () => {
    try {
      // ✅ Update inventory fields
      const payload = {
        posteddate: row.posteddate,
        location: row.location,
        status: row.status,
        date_tagged: row.date_tagged,
        vsp: row.vsp,
      };
      await update(row.cs, payload);

      // ✅ Update customer name separately in customers table
      if (row.customername || row.mpname) {
        await supabase
          .from("customers")
          .update({ customername: row.customername , mpname: row.mpname })
          .eq("vsp", row.vsp);
      }

      alert("Inventory updated!");
      setOpen(false);
      onSave(); // refresh parent
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Edit Inventory</DialogTitle>
      <DialogContent>
        <TextField
          label="Posted Date"
          type="date"
          fullWidth
          margin="dense"
          value={row.posteddate || ""}
          onChange={handleChange("posteddate")}
          InputLabelProps={{ shrink: true }} // ✅ ensures label stays above the date picker
        />
        <TextField
          label="Location"
          fullWidth
          margin="dense"
          value={row.location || ""}
          onChange={handleChange("location")}
        />
        {/* ✅ Status dropdown */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={row.status || ""}
            onChange={(e) => {
              const newStatus = e.target.value;
              setRow({
                ...row,
                status: newStatus,
                date_tagged: newStatus
                  ? new Date().toISOString().substring(0, 10)
                  : null,
              });
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Hold">HOLD</MenuItem>
            <MenuItem value="Allocated">ALLOCATED</MenuItem>
            <MenuItem value="Released">RELEASED</MenuItem>
            <MenuItem value="Transferred Out">TRANSFERRED OUT</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="VSP"
          fullWidth
          margin="dense"
          value={row.vsp || ""}
          onChange={handleChange("vsp")}
        />
        <TextField
          label="MP Name"
          fullWidth
          margin="dense"
          value={row.mpname || ""}
          onChange={handleChange("mpname")}
        />
        {/* ✅ Customer Name field */}
        <TextField
          label="Customer Name"
          fullWidth
          margin="dense"
          value={row.customername || ""}
          onChange={handleChange("customername")}
        />
        <Button
          onClick={() => setOpen(false)}
          variant="outlined"
          sx={{ mt: 2, mr: 2 }}
        >
          Back
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}