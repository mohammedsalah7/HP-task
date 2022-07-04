import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { getAllInvoices } from "../../Functions";
import { DeliveryContext } from "../../context";

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const { appData } = useContext(DeliveryContext);
  const history = useHistory();

  useEffect(() => {
    const allInvoices = getAllInvoices(appData);
    setInvoices(allInvoices);
  }, [appData]);
  return (
    <>
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
            {invoices.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                  onClick={() => history.push(`/invoice/${row.id}`)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.weights}</TableCell>
                  <TableCell>{row.prices}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InvoicesList;
