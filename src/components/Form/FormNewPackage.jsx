import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { addPackage, inputsValidation, checkInputEmpty } from "../../Functions";
import { DeliveryContext } from "../../context";
import "./style.css";

const inputsErrors = {
  id: "",
  weight: "",
  price: "",
  shippingOrder: "",
  customerid: "",
};

const newPackageValue = {
  weight: "",
  price: "",
  customerid: "",
};

function FormNewPackage({ open, handleFormDisplay }) {
  const { appData, setAppData } = useContext(DeliveryContext);
  const [newPackageDetailes, setNewPackageDetailes] = useState(
    newPackageValue
  );
  const [errors, setErrors] = useState(inputsErrors);

  const handleInputChange = (value) => {
    setNewPackageDetailes(value);
  };
  const validateInputs = () => {
    const errs = inputsValidation(newPackageDetailes);
    setErrors(errs);
    if (
      JSON.stringify(errs) === JSON.stringify(inputsErrors) &&
      checkInputEmpty(newPackageDetailes)
    )
      return true;
    return false;
  };
  const addNewPackage = () => {
    if (validateInputs()) {
      const { newAppData } = addPackage(
        {
          ...newPackageDetailes,
          id: `pack${appData.packages.length + 1}`,
          shippingOrder: appData.packages.length + 1,
        },
        appData
      );
    
      setAppData(newAppData);
      handleFormDisplay();
      setNewPackageDetailes(newPackageValue);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleFormDisplay}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 350,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            borderRadius: "50px ",
            padding: 3,
          }}
        >
          <form className="container-form">
            <h3 className="title"> Hi! Add New Package</h3>
            <TextField
              placeholder="Kg"
              name="weight"
              label="Weight"
              type="number"
              required
              error={errors.weight ? true : false}
              helperText={errors.weight}
              onChange={(event) =>
                handleInputChange({
                  ...newPackageDetailes,
                  weight: `${event.target.value}`,
                })
              }
              value={newPackageDetailes.weight}
            />
            <TextField
              placeholder="$"
              name="price"
              label="Price"
              type="number"
              required
              error={errors.price ? true : false}
              helperText={errors.price}
              onChange={(event) =>
                handleInputChange({ ...newPackageDetailes, price: event.target.value })
              }
              value={newPackageDetailes.price}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select">Customer Name</InputLabel>
              <Select
                labelId="select"
                id="select"
                value={newPackageDetailes.customerid}
                label="Customer Name"
                onChange={(event) =>
                  handleInputChange({
                    ...newPackageDetailes,
                    customerid: event.target.value,
                  })
                }
                style={{ margin: "-8px", padding: "5px" }}
              >
                {appData.customers.map((customer) => {
                  return (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              placeholder="Shipping Order"
              name="shippingOrder"
              label="Shipping Order"
              disabled={true}
              value={appData.packages.length + 1}
            />
            <div className="container-buttons">
              <Button
                size="medium"
                variant="contained"
                onClick={handleFormDisplay}
                color="error"
              >
                X
              </Button>

              <Button
                size="medium"
                variant="contained"
                onClick={addNewPackage}
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default FormNewPackage;
