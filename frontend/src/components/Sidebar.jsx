import React from "react";
import {
  Drawer,
  List,
  ListItemButton,   // ✅ use this instead of ListItem with button
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ReportIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";

export default function Sidebar({ collapsed, session }) {
  const drawerWidth = collapsed ? 60 : 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Home" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/inventory">
          <ListItemIcon><InventoryIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Inventory" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/customer">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Customers" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/releases">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Releases" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/report">
          <ListItemIcon><ReportIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Reports" />}
        </ListItemButton>

        <ListItemButton component={Link} to="/settings">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItemButton>

        {session?.user?.user_metadata?.role === "admin" && (
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
            {!collapsed && <ListItemText primary="Admin" />}
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
}