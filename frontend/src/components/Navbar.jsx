import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ session, collapsed, setCollapsed }) {
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!session) return;
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", session.user.id)
        .maybeSingle();
      if (!error && data) setUsername(data.username);
    };
    fetchUser();
  }, [session]);

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold">
            My Dashboard
          </Typography>
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {username ? username.charAt(0).toUpperCase() : "?"}
            </Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <Typography sx={{ px: 2, py: 1 }} variant="subtitle1">
              {username ? `Hello, ${username}` : "Loading..."}
            </Typography>
            <Divider />
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}