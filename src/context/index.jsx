import React, { createContext, useState, useEffect } from "react";
export const DeliveryContext = createContext();
const DeliveryProvider = ({ children }) => {
  const [appData, setAppData] = useState({ customers: [], packages: [] });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
  }, []);

  const handleDeleteCustomer = (id) => {
    let filterResults = appData.customers.filter((item) => {
      return item.id !== id;
    });
    setAppData({ ...appData, customers: filterResults });
  };

  const handleDeletePakage = (id) => {
    let filterResults = appData.packages.filter((item) => {
      return item.id !== id;
    });
    setAppData({ ...appData, packages: filterResults });
  };
  return (
    <DeliveryContext.Provider
      value={{ appData, setAppData, handleDeletePakage, handleDeleteCustomer }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
