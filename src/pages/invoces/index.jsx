import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
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

  const style = {
    border: "none",
    "&:last-child": {
      backgroundColor: "#808080",
    },
  };
  return (
    //  Invoice Page
    <div className="container">
      {/* header Section  */}
      <section className="details">
        <article className="left-side">
          <span>{date}</span>
          <h3>{customerName}</h3>
        </article>
        <section className="right-side">
          <h1>Invoice</h1>
          <span>No. {customerId}</span>
        </section>
      </section>
      {/* Table Section  */}
      <TableContainer sx={{ marginTop: "5%", boxShadow: "none" }}>
        <Table sx={{ maxWidth: 1250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={style}>ID</TableCell>
              <TableCell sx={style}>Weight</TableCell>
              <TableCell sx={style}>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packages.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={style}>{row.id}</TableCell>
                  <TableCell sx={style}>{row.weight}</TableCell>
                  <TableCell sx={style}>{row.price}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell sx={style}></TableCell>
              <TableCell
                sx={{
                  ...style,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                Total:{weights}kg
              </TableCell>
              <TableCell
                sx={{
                  ...style,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                Total : {prices}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/*   Message Section  */}
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
