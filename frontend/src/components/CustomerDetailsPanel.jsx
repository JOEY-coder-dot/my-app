import React, { useEffect, useState } from "react";
import { Paper, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getCustomerById } from "../utils/customers";

export default function CustomerDetailsPanel({ customer, onBack }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getCustomerById(customer.vsp).then((res) => setDetails(res.data));
  }, [customer.vsp]);

  if (!details) return <p>Loading...</p>;

  const inventoryColumns = [
    { field: "date", headerName: "Invoice Date", width: 150 },
    { field: "cs", headerName: "CS Number", width: 150 },
    { field: "model", headerName: "Unit Model", width: 200 },
    { field: "color", headerName: "Color", width: 150 },
    { field: "year", headerName: "Year Model", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    // { field: "chassisnum", headerName: "Chassis No.", width: 200 },
    // { field: "enginenum", headerName: "Engine No.", width: 200 },
    // { field: "keynum", headerName: "Key No.", width: 150 },
    // { field: "weight", headerName: "Weight", width: 150 },
  ];

  return (
    <Paper sx={{ p: 3 }}>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        ← Back
      </Button>

      <h2>{details.customername}</h2>
      <p><strong>Code:</strong> {details.customercode}</p>
      <p><strong>Address:</strong> {details.customeraddress}</p>
      <p><strong>Reservation Type:</strong> {details.reservationtype}</p>
      <p><strong>MP:</strong> {details.mpname}</p>
      <p><strong>SRP:</strong> {details.srp}</p>

      <h3>Linked Inventory Units</h3>
      <DataGrid
        rows={details.inventory}
        columns={inventoryColumns}
        getRowId={(row) => row.cs}
        autoHeight
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        disableRowSelectionOnClick
        sx={{
          border: 1,
          mt: 2,
          "& .MuiDataGrid-cell": { borderRight: "1px solid #e0e0e0" },
          "& .MuiDataGrid-columnHeaders": { borderBottom: "2px solid #e0e0e0" },
          "& .MuiDataGrid-row": { borderBottom: "1px solid #e0e0e0" },
        }}
      />
    </Paper>
  );
}