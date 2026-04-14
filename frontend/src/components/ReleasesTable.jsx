import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper, TextField, IconButton, Menu, MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { generateInvoice } from "../utils/generateInvoice";

export default function ReleasesTable({ rows, onViewDetails }) {
  const [search, setSearch] = useState("");

  // 🔍 Search filter
  const filteredRows = rows.filter((row) =>
    Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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
            View Details
          </MenuItem>
          <MenuItem onClick={() => { generateInvoice(row); setAnchorEl(null); }}>
            Invoice
          </MenuItem>
        </Menu>
      </>
    );
  };

  // 🔥 Columns
  const columns = [
    { field: "cs", headerName: "CS Number", width: 150 },
    { field: "model", headerName: "Unit Model", width: 200 },
    { field: "mpname", headerName: "MP Name", width: 200 },
    { field: "customername", headerName: "Customer Name", width: 200 },
    { field: "customeraddress", headerName: "Customer Address", width: 200 },
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

  return (
    <Paper sx={{ height: 500, width: "100%", p: 2 }}>
      {/* Search bar */}
      <TextField
        fullWidth
        label="Search releases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* DataGrid */}
      <div style={{ width: "100%", height: 450 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.cs}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          sx={{
            border: 1,
            "& .MuiDataGrid-cell": { borderRight: "1px solid #e0e0e0" },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid #e0e0e0",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": { borderBottom: "1px solid #e0e0e0" },
          }}
        />
      </div>
    </Paper>
  );
}