import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Paper, TextField, Button, Box, IconButton, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  removeCustomer,
  addCustomer,
} from "../utils/customers";
import CustomerEditDialog from "./CustomerEditDialog";

export default function CustomersTable({ onViewDetails }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getAllCustomers();
      setRows(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
      setRows([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Add Customer handler
  const handleAdd = () => {
    setEditRow({
      vsp: "",
      customercode: "",
      customername: "",
      customeraddress: "",
      reservationtype: "",
      mpname: "",
      srp: "",
      vsi: "",
    });
    setEditOpen(true);
  };

  // 🔥 Action Menu
  const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
      <>
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { onViewDetails(row); setAnchorEl(null); }}>
            View
          </MenuItem>
          <MenuItem
            onClick={async () => {
              const res = await getCustomerById(row.vsp);
              setEditRow(res.data);
              setEditOpen(true);
              setAnchorEl(null);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            sx={{ color: "red" }}
            onClick={async () => {
              if (!window.confirm(`Delete customer ${row.customername}?`)) return;
              try {
                await removeCustomer(row.vsp);
                alert("Customer deleted!");
                fetchData();
              } catch (err) {
                console.error("Delete failed:", err);
              }
              setAnchorEl(null);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  // 🔥 Columns definition
  const columns = [
    { field: "vsi", headerName: "VSI", width: 150 },
    { field: "vsp", headerName: "VSP", width: 150 },
    { field: "reservationtype", headerName: "Reservation Type", width: 200 },
    { field: "customercode", headerName: "Customer Code", width: 150 },
    { field: "customername", headerName: "Customer Name", width: 200 },
    { field: "customeraddress", headerName: "Customer Address", width: 250 },
    { field: "mpname", headerName: "MP Name", width: 200 },
    { field: "srp", headerName: "SRP", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <ActionMenu row={params.row} />,
    },
  ];

  // 🔍 Search filter
  const filteredRows = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ height: "85vh", width: "100%", p: 2, display: "flex", flexDirection: "column" }}>
      {/* Header with search + add */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <TextField
          label="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: "300px" }}
        />
        <Button variant="contained" color="success" onClick={handleAdd}>
          Add Customer
        </Button>
      </Box>

      {/* DataGrid */}
      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.vsp}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5, 10, 20, 50]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        sx={{
          flex: 1,
          border: 1,
          "& .MuiDataGrid-cell": { borderRight: "1px solid #e0e0e0" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #e0e0e0", fontWeight: "bold" },
          "& .MuiDataGrid-row": { borderBottom: "1px solid #e0e0e0" },
        }}
      />

      {/* Edit Dialog */}
      <CustomerEditDialog
        open={editOpen}
        setOpen={setEditOpen}
        row={editRow}
        setRow={setEditRow}
        onSave={async () => {
          try {
            if (editRow.vsp) {
              await updateCustomer(editRow.vsp, editRow);
              alert("Customer updated!");
            } else {
              await addCustomer(editRow);
              alert("Customer added!");
            }
            setEditOpen(false);
            fetchData();
          } catch (err) {
            console.error("Save failed:", err);
          }
        }}
      />
    </Paper>
  );
}