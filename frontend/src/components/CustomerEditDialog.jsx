import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";

export default function CustomerEditDialog({ open, setOpen, row, setRow, onSave }) {
  if (!row) return null;

  const handleChange = (field) => (e) => {
    setRow({ ...row, [field]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{row.vsp ? "Edit Customer" : "Add Customer"}</DialogTitle>
      <DialogContent>
        {row.vsp && (
          <TextField
            label="VSP"
            fullWidth
            margin="dense"
            value={row.vsp || ""}
            InputProps={{ readOnly: true }}
          />
        )}
        <TextField
          label="Customer Code"
          fullWidth
          margin="dense"
          value={row.customercode || ""}
          onChange={handleChange("customercode")}
        />
        <TextField
          label="Customer Name"
          fullWidth
          margin="dense"
          value={row.customername || ""}
          onChange={handleChange("customername")}
        />
        <TextField
          label="Customer Address"
          fullWidth
          margin="dense"
          value={row.customeraddress || ""}
          onChange={handleChange("customeraddress")}
        />
        <TextField
          label="Reservation Type"
          fullWidth
          margin="dense"
          value={row.reservationtype || ""}
          onChange={handleChange("reservationtype")}
        />
        <TextField
          label="MP Name"
          fullWidth
          margin="dense"
          value={row.mpname || ""}
          onChange={handleChange("mpname")}
        />
        <TextField
          label="SRP"
          fullWidth
          margin="dense"
          value={row.srp || ""}
          onChange={handleChange("srp")}
        />
        <TextField
          label="VSI"
          fullWidth
          margin="dense"
          value={row.vsi || ""}
          onChange={handleChange("vsi")}
        />

        <Button onClick={onSave} variant="contained" sx={{ mt: 2 }}>
          {row.vsp ? "Save Changes" : "Add Customer"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}