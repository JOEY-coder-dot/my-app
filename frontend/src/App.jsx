import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import SetPassword from "./components/auth/SetPassword";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Releases from "./pages/Releases";
import Customer from "./pages/Customers";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import { Box, CircularProgress } from "@mui/material";

function PrivateRoute({ children, session }) {
  return session ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const syncRole = async (session) => {
      if (!session?.user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();
      if (!error && data?.role) {
        session.user.user_metadata = {
          ...session.user.user_metadata,
          role: data.role,
        };
        setSession(session);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      syncRole(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        syncRole(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/set-password" element={<SetPassword />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute session={session}>
            <Layout collapsed={collapsed} setCollapsed={setCollapsed} session={session}>
              {loading ? (
                <Box sx={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : null}
            </Layout>
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
        <Route
          path="admin"
          element={
            <PrivateRoute session={session}>
              {session?.user?.user_metadata?.role === "admin" ? (
                <Admin />
              ) : (
                <Navigate to="/home" replace />
              )}
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}
