import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import { isLoggedIn } from "./utils/auth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Releases from "./pages/Releases";
import Customer from "./pages/Customers";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout collapsed={collapsed} setCollapsed={setCollapsed} />
          </PrivateRoute>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* Sidebar panels */}
        <Route path="home" element={<Home />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="releases" element={<Releases />} />
        <Route path="customer" element={<Customer />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}