import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Avatar } from "@mui/material";
import { Chip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/UserActions";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.logInUser);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{ mx: "3rem", display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6">Your App Name</Typography>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={openDrawer} onClose={handleDrawerClose}>
        <div style={{ width: 250 }}>
          <List>
            <ListItem button>
              <Chip
                avatar={<Avatar size={32}>M</Avatar>}
                label={currUser?.firstName}
                style={{ margin: "5% 0 0 0" }}
              />
            </ListItem>
            <ListItem button>
              <ListItemText
                primary="Edit Profile"
                onClick={() => navigate("/edituser")}
              />
            </ListItem>

            <ListItem button>
              <ListItemText
                primary="Change Password"
                onClick={() => navigate("/changePassword")}
              />
            </ListItem>
          </List>

          <List>
            <Button onClick={handleLogOut}>
              <LogoutIcon />
              Logout
            </Button>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
