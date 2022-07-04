import { useEffect, useState } from "react";
import { getPackagesByCustomerId, getPricesToCustomer, getWeightsToCustomer } from "../Functions";
function useInvoces(customerId, appData) {
  const [packages, setPackages] = useState([]);
  const [prices, setPrices] = useState(0);
  const [weights, setWeights] = useState(0);

  useEffect(() => {
    setPackages(getPackagesByCustomerId(appData, customerId));
  }, [appData, customerId]);

  useEffect(() => {
    setPrices(getPricesToCustomer(packages));
    setWeights(getWeightsToCustomer(packages));
  }, [packages]);

  return { prices, weights, packages };
}

export default useInvoces;
