import React from "react";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Tooltip } from "@mui/material";
import { HomeOutlined, Inventory2Outlined, DescriptionOutlined, PeopleAltOutlined, SettingsOutlined, Menu as MenuIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const NavLinkWrapper = React.forwardRef((props, ref) => <NavLink ref={ref} {...props} />);

export default function Sidebar({ collapsed, setCollapsed }) {
  const width = collapsed ? 70 : 220;

  const menuItems = [
    { label: "Home", path: "/home", icon: <HomeOutlined /> },
    { label: "Inventory", path: "/inventory", icon: <Inventory2Outlined /> },
    { label: "Releases", path: "/releases", icon: <DescriptionOutlined /> },
    { label: "Customer", path: "/customer", icon: <PeopleAltOutlined /> },
    { label: "Report", path: "/report", icon: <DescriptionOutlined /> },
    { label: "Settings", path: "/settings", icon: <SettingsOutlined /> },
  ];

  return (
    <Box sx={{ width, transition: "width 0.3s", overflowX: "hidden", display: "flex", flexDirection: "column", borderRight: "1px solid #e0e0e0", height: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", p: 1 }}>
        <IconButton onClick={() => setCollapsed(prev => !prev)}><MenuIcon /></IconButton>
      </Box>

      <List sx={{ flex: 1 }}>
        {menuItems.map(item => (
          <ListItem key={item.path} disablePadding>
            <Tooltip title={collapsed ? item.label : ""} placement="right">
              <ListItemButton
                component={NavLinkWrapper}
                to={item.path}
                sx={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  mb: 1,
                  mx: 1,
                  borderRadius: 2,
                  "&.active": {
                    backgroundColor: "action.selected",
                    "& .MuiListItemIcon-root": { color: "primary.main" },
                    "& .MuiListItemText-root": { color: "primary.main", fontWeight: "bold" }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: "center" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: collapsed ? 0 : 1, transition: "opacity 0.3s", whiteSpace: "nowrap" }} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}