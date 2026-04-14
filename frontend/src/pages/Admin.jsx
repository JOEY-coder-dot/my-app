import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Box, Typography, Paper, TextField, Button, Select, MenuItem,
  InputLabel, FormControl, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Divider, Snackbar, Alert
} from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function Admin() {
  const { session } = useOutletContext();   // ✅ get session from Layout
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState("user");
  const [users, setUsers] = useState([]);
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (!session) return;

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, position, role, created_at");

      if (error) {
        console.error("❌ Failed to fetch users:", error.message);
      } else {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [session]);

  // ✅ Replace /api/invite with Supabase function call
  const handleInvite = async (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      setFeedback({ open: true, message: "Email and Username are required.", severity: "error" });
      return;
    }

    try {
      // Call your Supabase Edge Function (create-user)
      const res = await fetch("https://szzkvmvxglqyweabpnal.supabase.co/functions/v1/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password: "InitialPassword123", // ✅ initial password
          username,
          position,
          role,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setFeedback({ open: true, message: "Error: " + data.error, severity: "error" });
      } else {
        setFeedback({ open: true, message: "✅ User added successfully!", severity: "success" });
        setEmail("");
        setUsername("");
        setPosition("");
        setRole("user");
      }
    } catch (err) {
      setFeedback({ open: true, message: "❌ Failed to add user: " + err.message, severity: "error" });
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Admin Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Invite Form */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>
        <Box component="form" onSubmit={handleInvite} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField label="User Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
          <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required fullWidth />
          <TextField label="Position" value={position} onChange={(e) => setPosition(e.target.value)} fullWidth />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "center" }}>
            Add User
          </Button>
        </Box>
      </Paper>

      {/* User List */}
      <Paper sx={{ p: 3 }} elevation={3}>
        <Typography variant="h6" gutterBottom>
          Existing Users
        </Typography>
        {users.length === 0 ? (
          <Typography>No users found in profiles.</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Created</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.position}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Feedback Snackbar */}
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert severity={feedback.severity} onClose={() => setFeedback({ ...feedback, open: false })}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}