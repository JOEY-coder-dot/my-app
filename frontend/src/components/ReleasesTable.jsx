import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper, TextField, Button } from "@mui/material";
import { generateInvoice } from "../utils/generateInvoice";

export default function ReleasesTable({ rows, onViewDetails }) {
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    { field: "cs", headerName: "CS Number", width: 150 },
    { field: "model", headerName: "Unit Model", width: 200 },
    { field: "mpname", headerName: "MP Name", width: 200 },
    { field: "customername", headerName: "Customer Name", width: 200 },
    { field: "customeraddress", headerName: "Customer Address", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
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
          onClick={() => generateInvoice(params.row)} // ✅ hook up invoice generation
        >
          Invoice
        </Button>
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: "100%", p: 2 }}>
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
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        disableRowSelectionOnClick
        />
    </div>
    </Paper>
  );
}