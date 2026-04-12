import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

export default function EditDialog({ open, setOpen, row, setRow, onSave }) {
  if (!row) return null;

  const handleChange = (field) => (e) => {
    setRow({ ...row, [field]: e.target.value });
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
        <TextField
          label="VSP"
          fullWidth
          margin="dense"
          value={row.vsp || ""}
          onChange={handleChange("vsp")}
        />

        <Button onClick={onSave} variant="contained" sx={{ mt: 2 }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}