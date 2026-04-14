import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Releases from "./pages/Releases";
import Customer from "./pages/Customers";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

function PrivateRoute({ children, session }) {
  return session ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // ✅ Hydrate session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // ✅ Listen for login/logout/password recovery events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // ✅ Cleanup listener correctly
    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
          <PrivateRoute session={session}>
            <Layout collapsed={collapsed} setCollapsed={setCollapsed} />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
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