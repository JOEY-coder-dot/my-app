import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const Stockunit = [
  { Unit: "Wigo", Stock: 23 },
  { Unit: "Vios", Stock: 103 },
  { Unit: "Gr Corolla", Stock: 1 },
  { Unit: "Avanza", Stock: 57 },
  { Unit: "Corolla Cross", Stock: 6 },
  { Unit: "Fortuner", Stock: 33 },
  { Unit: "Hiace", Stock: 51 },
  { Unit: "Hilux", Stock: 84 },
  { Unit: "Tamaraw", Stock: 46 },
  { Unit: "Innova", Stock: 41 },
  { Unit: "Zenix", Stock: 5 },
  { Unit: "Liteace", Stock: 1 },
  { Unit: "Raize", Stock: 60 },
  { Unit: "Rush", Stock: 18 },
  { Unit: "Veloz", Stock: 14 },
  { Unit: "Yaris Cross", Stock: 1 },
  { Unit: "Alphard", Stock: 4 },
  { Unit: "LC300", Stock: 100 },
  { Unit: "Prado", Stock: 3 },
  { Unit: "Rav4", Stock: 1 },
];

export default function Home() {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Example summary cards */}
        {["Total Inventory", "Actual unit", "Physical Release", "Posted Unit"].map((title, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="h5">{Math.floor(Math.random() * 500)}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2, mb: 3, overflowX: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Inventory Breakdown
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={Stockunit}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Unit" angle={-45} textAnchor="end" interval={0} height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Stock" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, overflowX: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Recent Orders
        </Typography>
        <Box component="table" sx={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th align="left">Order ID</th>
              <th align="left">Customer</th>
              <th align="left">Amount</th>
              <th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: "#1001", customer: "John Doe", amount: "$120", status: "Completed" },
              { id: "#1002", customer: "Jane Smith", amount: "$80", status: "Pending" },
              { id: "#1003", customer: "Bob Johnson", amount: "$200", status: "Completed" },
            ].map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.customer}</td>
                <td>{row.amount}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Paper>
    </Box>
  );
}