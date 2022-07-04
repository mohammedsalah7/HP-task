import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import "./style.css"
const NavBar = () => {
  const [open, setOpen] = useState(false);

  const handleSideBar = () => setOpen(!open);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleSideBar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mail Delivery Service
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor={"left"}
        open={open}
        onClose={handleSideBar}
        sx={{
          width:150,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width:150,
            boxSizing: "border-box",
            marginTop: 8,
            marginRight:500,
          },
        }}
        variant="persistent"
      >
        <List style={{ width: "300px" }}>
          <Link to="/"   className="link" >
            <ListItem button   onClick={() => handleSideBar()}>
              <ListItemText primary={"Customers"} />
            </ListItem>
          </Link>
          <Link to="/pakage"  className="link">
            <ListItem button onClick={() => handleSideBar()}>
              <ListItemText primary={"Packages"} />
            </ListItem>
          </Link>
          <Link to="/invoices"  className="link"  >
            <ListItem button  onClick={() => handleSideBar()}>
              <ListItemText primary={"Invoices"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};

export default NavBar;
