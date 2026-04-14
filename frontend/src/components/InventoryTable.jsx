import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, TextField,
  IconButton, Menu, MenuItem, Chip
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DataGrid,
  GridToolbar
} from "@mui/x-data-grid";

import { generateInvoice } from "../utils/generateInvoice";
import { getAll, getById, remove } from "../utils/inventory";
import EditDialog from "./EditDialog";

export default function InventoryTable({ onViewDetails }) {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getAll();
      setRows(res);
    } catch {
      setRows([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔍 SEARCH
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // 🔥 ACTION MENU COMPONENT
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

          <MenuItem onClick={() => { generateInvoice(row); setAnchorEl(null); }}>
            Invoice
          </MenuItem>

          <MenuItem
            onClick={async () => {
              const res = await getById(row.cs);
              setEditRow(res);
              setEditOpen(true);
              setAnchorEl(null);
            }}
          >
            Update
          </MenuItem>

          <MenuItem
            sx={{ color: "red" }}
            onClick={async () => {
              if (!window.confirm(`Delete ${row.cs}?`)) return;
              await remove(row.cs);
              fetchData();
              setAnchorEl(null);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </>
    );
  };

  // 🔥 COLUMNS
  const columns = [
    { field: "date", headerName: "Invoice Date", flex: 1, minWidth: 130, resizable: true },
    { field: "posteddate", headerName: "Posted Date", flex: 1, minWidth: 130, resizable: true },
    { field: "cs", headerName: "CS Number", flex: 0.8, minWidth: 120 },
    { field: "vsp", headerName: "VSP", flex: 0.8, minWidth: 100 },
    { field: "customer_name", headerName: "Customer Name", flex: 1.5, minWidth: 180 },
    { field: "model", headerName: "Unit Model", flex: 1, minWidth: 130 },
    { field: "color", headerName: "Color", flex: 0.8, minWidth: 100 },
    { field: "year", headerName: "Year", flex: 0.6, minWidth: 90 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
    },

    { field: "location", headerName: "Location", flex: 1, minWidth: 130 },

    // ✅ ACTION COLUMN (ALWAYS VISIBLE)
    {
      field: "actions",
      headerName: "",
      width: 70,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => <ActionMenu row={params.row} />,
    },
  ];

  return (
    <Paper
      sx={{
        p: "clamp(8px, 1vw, 16px)",
        display: "flex",
        flexDirection: "column",
        height: "85vh",
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2 }}>
        <Typography sx={{ fontSize: "clamp(16px, 1.2vw, 22px)", fontWeight: "bold" }}>
          Inventory Management
        </Typography>

        <TextField
          placeholder="Search..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: "clamp(150px, 30%, 300px)" }}
        />
      </Box>

      {/* 🔥 DATAGRID */}
      <Box sx={{ flex: 1 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.cs}

          slots={{ toolbar: GridToolbar }}

          pageSizeOptions={[5, 10, 20, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}

          disableRowSelectionOnClick

          // ✅ ENABLE EXCEL-LIKE RESIZE
          columnBuffer={5}
          columnThreshold={3}

          sx={{
            fontSize: "clamp(11px, 0.9vw, 14px)",

            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
            },

            "& .MuiDataGrid-cell": {
              alignItems: "center",
            },

            // 👇 visual resize handle (better UX)
            "& .MuiDataGrid-columnSeparator": {
              cursor: "col-resize",
            },
          }}
        />
      </Box>

      {/* EDIT DIALOG */}
      <EditDialog
        open={editOpen}
        setOpen={setEditOpen}
        row={editRow}
        setRow={setEditRow}
        onSave={fetchData}
      />
    </Paper>
  );
}