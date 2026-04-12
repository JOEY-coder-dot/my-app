import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, TextField, Button } from "@mui/material";
import {
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  removeCustomer,
  addCustomer, // ✅ new API call
} from "../utils/customers";
import CustomerEditDialog from "./CustomerEditDialog";

export default function CustomersTable({ onViewDetails }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const fetchData = () => {
    getAllCustomers().then((res) => setRows(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Add Customer handler
  const handleAdd = () => {
    setEditRow({
      vsp: "", // empty means new record
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
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            size="small"
            color="primary"
            onClick={() => onViewDetails(params.row)}
          >
            View Details
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={async () => {
              const res = await getCustomerById(params.row.vsp);
              setEditRow(res.data);
              setEditOpen(true);
            }}
          >
            Update
          </Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              const confirmed = window.confirm(
                `Delete customer ${params.row.customername}?`
              );
              if (!confirmed) return;
              try {
                await removeCustomer(params.row.vsp);
                alert("Customer deleted!");
                fetchData();
              } catch (err) {
                console.error("Delete failed:", err);
              }
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const filteredRows = rows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Paper sx={{ height: 555, width: "100%", p: 2 }}>
      <TextField
        fullWidth
        label="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* ✅ Add Customer button */}
      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={handleAdd}
      >
        Add Customer
      </Button>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.vsp}
        pageSizeOptions={[5, 10, 20]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        disableRowSelectionOnClick
        sx={{
          height: 400,
          border: 1,
          "& .MuiDataGrid-cell": { borderRight: "1px solid #e0e0e0" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #e0e0e0" },
          "& .MuiDataGrid-row": { borderBottom: "1px solid #e0e0e0" },
        }}
      />

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