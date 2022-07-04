import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useInvoces from "../../customHook/useInvoces";
import { DeliveryContext } from "../../context";
import { getCustomerNameById } from "../../Functions";
import "./invoice.css";

function Invoice() {
  const [customerName, setCustomerName] = useState("");
  const { appData } = useContext(DeliveryContext);
  const { customerId } = useParams();
  const { weights, prices, packages } = useInvoces(customerId, appData);
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    setCustomerName(getCustomerNameById(customerId, appData.customers));
  }, [appData.customers, customerId]);

  return (
    <div className="container">
      <section className="details">
        <article className="left-side">
          <span>{date}</span>
          <h3>{customerName}</h3>
        </article>
        <section className="right-side">
          <h1>Invoice</h1>
          <span>No {customerId + 10}</span>
        </section>
      </section>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: "95%", marginLeft: "40px", overflow: "hidden" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "18px" }}>
                {" "}
                Weight
              </TableCell>
              <TableCell
                sx={{
                  width: "40%",
                  backgroundColor: "#808080",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {" "}
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((row) => {
              return (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontSize: "14px" }}>{row.id}</TableCell>
                  <TableCell sx={{ fontSize: "14px" }}> {row.weight}</TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#808080", fontSize: "14px" }}
                  >
                    {" "}
                    {row.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell sx={{ fontSize: "14px" }}>Total</TableCell>
              <TableCell sx={{ fontSize: "14px" }}> {weights}kg</TableCell>
              <TableCell sx={{ backgroundColor: "#808080" }}>
                {" "}
                {prices}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <section className="message">
        <p>
          You received <b>{packages.length}</b> packages
        </p>
        <p>Thank you for using our services</p>
      </section>
    </div>
  );
}

export default Invoice;
