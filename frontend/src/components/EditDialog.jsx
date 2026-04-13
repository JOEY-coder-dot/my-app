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
        date: row.date,
        posteddate: row.posteddate,
        model: row.model,
        color: row.color,
        year: row.year,
        location: row.location,
        chassisnum: row.chassisnum,
        enginenum: row.enginenum,
        keynum: row.keynum,
        weight: row.weight,
        status: row.status,
        date_tagged: row.date_tagged,
        vsp: row.vsp,
      };
      await update(row.cs, payload);

      // ✅ Update customer name separately in customers table
      if (row.customername) {
        await supabase
          .from("customers")
          .update({ customername: row.customername })
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
          label="Invoice Date"
          type="date"
          fullWidth
          margin="dense"
          value={row.date ? row.date.substring(0, 10) : ""}
          onChange={handleChange("date")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Posted Date"
          type="date"
          fullWidth
          margin="dense"
          value={row.posteddate ? row.posteddate.substring(0, 10) : ""}
          onChange={handleChange("posteddate")}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="CS Number"
          fullWidth
          margin="dense"
          value={row.cs || ""}
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Unit Model"
          fullWidth
          margin="dense"
          value={row.model || ""}
          onChange={handleChange("model")}
        />
        <TextField
          label="Color"
          fullWidth
          margin="dense"
          value={row.color || ""}
          onChange={handleChange("color")}
        />
        <TextField
          label="Year Model"
          fullWidth
          margin="dense"
          value={row.year || ""}
          onChange={handleChange("year")}
        />
        <TextField
          label="Location"
          fullWidth
          margin="dense"
          value={row.location || ""}
          onChange={handleChange("location")}
        />
        <TextField
          label="Chassis No."
          fullWidth
          margin="dense"
          value={row.chassisnum || ""}
          onChange={handleChange("chassisnum")}
        />
        <TextField
          label="Engine No."
          fullWidth
          margin="dense"
          value={row.enginenum || ""}
          onChange={handleChange("enginenum")}
        />
        <TextField
          label="Key No."
          fullWidth
          margin="dense"
          value={row.keynum || ""}
          onChange={handleChange("keynum")}
        />
        <TextField
          label="Weight"
          fullWidth
          margin="dense"
          value={row.weight || ""}
          onChange={handleChange("weight")}
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

        {/* ✅ Customer Name field */}
        <TextField
          label="Customer Name"
          fullWidth
          margin="dense"
          value={row.customername || ""}
          onChange={handleChange("customername")}
        />

        <Button onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}