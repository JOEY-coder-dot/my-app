import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Container, Paper } from "@mui/material";

export default function Layout({ collapsed, setCollapsed, session, children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar always visible */}
      <Sidebar collapsed={collapsed} session={session} />

      {/* Main content area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar session={session} collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Scroll only inside this section */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",   // ✅ scroll only here
            overflowX: "hidden",
            backgroundColor: "#f5f5f5", // subtle background
          }}
        >
          <Container maxWidth="xl" sx={{ py: 3 }}>
            <Paper elevation={2} sx={{ p: 3 }}>
              {children || <Outlet context={{ session }} />}
            </Paper>
          </Container>
        </main>
      </div>
    </div>
  );
}