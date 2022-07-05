import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeliveryContext } from "../../context";
import "./customer.css";


const Customers = () => {
  const { appData, handleDeleteCustomer } = useContext(DeliveryContext);
  return (
    // Customers Page
    <div>
      {/* Customers Table  */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appData.customers.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {/* Create Invoice Button  */}
                    <Link to={`/invoice/${row.id}`} className="create-btn">
                      <Button
                        variant="contained"
                        sx={{
                          textTransform: "none",
                        }}
                      >
                        Create Invoice
                      </Button>
                    </Link>
                  </TableCell>
                       {/* Delete Customer Button  */}
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDeleteCustomer(row.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customers;
