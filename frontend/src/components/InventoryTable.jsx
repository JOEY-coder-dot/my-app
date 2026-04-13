import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, TextField, Button } from "@mui/material";
import { generateInvoice } from "../utils/generateInvoice";
import { getAll, getById, update, remove } from "../utils/inventory";
import EditDialog from "./EditDialog";

export default function InventoryTable({ onViewDetails }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

    const fetchData = () => {
    getAll()
      .then((res) => {
        // ✅ No need to remap here, getAll already flattened customer_name
        setRows(res);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setRows([]);
      });
    };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "date", headerName: "Invoice Date", width: 150 },
    { field: "posteddate", headerName: "Posted Date", width: 150 },
    { field: "cs", headerName: "CS Number", width: 150 },
    { field: "vsp", headerName: "VSP", width: 150 },
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "model", headerName: "Unit Model", width: 200 },
    { field: "color", headerName: "Color", width: 150 },
    { field: "year", headerName: "Year Model", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 360,
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
            color="success"
            onClick={() => generateInvoice(params.row)}
          >
            Invoice
          </Button>
          <Button
            size="small"
            color="warning"
            onClick={async () => {
              try {
                const res = await getById(params.row.cs);
                setEditRow(res || null);
                setEditOpen(true);
              } catch (err) {
                console.error("Fetch by ID failed:", err);
              }
            }}
          >
            Update
          </Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              const confirmed = window.confirm(
                `Are you sure you want to delete inventory with CS: ${params.row.cs}?`
              );
              if (!confirmed) return;

              try {
                await remove(params.row.cs);
                alert("Inventory deleted!");
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

  const filteredRows = Array.isArray(rows)
    ? rows.filter((row) =>
        Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Paper sx={{ height: 555, width: "100%", p: 2 }}>
      <TextField
        fullWidth
        label="Search inventory..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <div style={{ width: "100%", height: 450 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.cs}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          disableRowSelectionOnClick
          sx={{
            border: 1,
            "& .MuiDataGrid-cell": { borderRight: "1px solid #e0e0e0" },
            "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #e0e0e0" },
            "& .MuiDataGrid-row": { borderBottom: "1px solid #e0e0e0" },
          }}
        />
      </div>
    <EditDialog
      open={editOpen}
      setOpen={setEditOpen}
      row={editRow}
      setRow={setEditRow}
      onSave={fetchData}   // just pass fetchData directly
    />
    </Paper>
  );
}