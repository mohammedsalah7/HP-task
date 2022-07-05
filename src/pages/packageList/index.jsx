import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import FormNewPackage from "../../components/Form/FormNewPackage";
import { DeliveryContext } from "../../context";
import { getCustomerNameById } from "../../Functions";

const Pakages = () => {
  const { appData, handleDeletePakage } = useContext(DeliveryContext);
  const [open, setOpen] = useState(false);
  const [packagesList, setPackagesList] = useState([]);
  const handleFormDisplay = () => setOpen(!open);

  useEffect(() => {
    const sortedPackages = appData.packages.sort((a, b) =>
      a.shippingOrder > b.shippingOrder ? 1 : -1
    );
    setPackagesList(sortedPackages);
  }, [appData]);

  // handle functon to re order Packages Up
  const reorderToUp = (index) => {
    setPackagesList((prevState) => {
      if (index === 0) return prevState;
      let data = [...prevState];
      let temp = data[index - 1];
      data[index - 1] = data[index];
      data[index] = temp;
      return data;
    });
  };

  // handle functon to re order Packages Down
  const reorderToDown = (index) => {
    setPackagesList((prevState) => {
      if (index === prevState.length - 1) return prevState;
      let data = [...prevState];
      let temp = data[index + 1];
      data[index + 1] = data[index];
      data[index] = temp;
      return data;
    });
  };
  return (
    <>
      <FormNewPackage open={open} handleFormDisplay={handleFormDisplay} />

      {/* Packages  Table  */}
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
                  onClick={handleFormDisplay}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packagesList.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>
                    {getCustomerNameById(row.customerid, appData.customers)}
                  </TableCell>
                  <TableCell>{row.weight}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    {/* Delete Package Button  */}
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleDeletePakage(row.id);
                      }}
                    >
                      Delete
                    </Button>
                    {/* Up order  Button  */}
                    <ArrowCircleUpIcon
                      sx={{
                        width: "50px",
                      }}
                      onClick={() => {
                        reorderToUp(index);
                      }}
                    />
                    {/* Down order  Button  */}
                    <ArrowCircleDownIcon
                      sx={{
                        width: "50px",
                      }}
                      onClick={() => {
                        reorderToDown(index);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Pakages;
