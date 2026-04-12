import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"; // ✅ import Outlet
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ collapsed, setCollapsed }) {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: `calc(100% - ${collapsed ? 80 : 220}px)`,
          transition: "width 0.3s",
        }}
      >
        <Navbar />
        <Box
          sx={{
            p: 3,
            overflow: "auto",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <Outlet /> {/* ✅ nested routes render here */}
        </Box>
      </Box>
    </Box>
  );
}