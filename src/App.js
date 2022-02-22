import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './App.css';

function App() {

  const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [invoices, setInvoices] = useState([]);

  fetch("/data.json").then(response => response.json())
  .then(data => { setAppData(data) });


  return (
    <div className="App">
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Mail Delivery Service
              </Typography>

            </Toolbar>
          </AppBar>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell >id</TableCell>
                <TableCell >Name</TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {appData.customers.map((row) => {

                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell >{row.name}</TableCell>
                    <TableCell ><Button variant="contained">Create Invoice</Button></TableCell>
                    <TableCell ><Button variant="contained">Delete</Button></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Price</TableCell>
              
                <TableCell>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                  >
                    <AddIcon />
                  </IconButton></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appData.packages.map((row) => {

                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell >{row.weight}</TableCell>

                    <TableCell ></TableCell>
                    <TableCell >{row.price}</TableCell>
                    <TableCell ><Button variant="contained">Delete</Button><i>Up down buttons should go here</i></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>                
                <TableCell>Customer Name</TableCell>
                <TableCell>Total Weight</TableCell>
                <TableCell>Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((row) => {

                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Drawer
          anchor={"left"}
          open={false}
          onClose={() => { }}

        >
          <List style={{ width: "300px" }}>
            <ListItem button>
              <ListItemText primary={"Packages"} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={"Customers"} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={"Invoices"} />
            </ListItem>
          </List>
        </Drawer>
      </Router>
    </div>

  );
}

export default App;
