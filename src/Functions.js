// handle funtion to get name  of customer  by Id
const getCustomerNameById = (id, customers) => {
  const customer = customers.filter(
    (customer) => parseInt(id) === customer.id
  )[0];
  return customer?.name;
};

// handle funtion to get all  packages for  customer by customerId
const getPackagesByCustomerId = (appData, customerId) => {
  const pack = appData.packages.filter(
    (customePackage) => parseInt(customerId) === customePackage.customerid
  );
  return pack;
};
// handle funtion to get customer packages prices
const getPricesToCustomer = (packages) => {
  const prices = packages.reduce(
    (previousValue, currentValue) => previousValue + currentValue.price,
    0
  );
  return prices;
};
// handle funtion to get Customer packages weights
const getWeightsToCustomer = (packages) => {
  const weights = packages.reduce(
    (previousValue, currentValue) =>
      previousValue + parseInt(currentValue.weight.split("kg")[0]),
    0
  );
  return weights;
};
// handle funtion to get all nvoices for all customer

const getAllInvoices = (appData) => {
  const allInvoices = [];
  appData.customers.forEach((customer) => {
    const customerPackages = getPackagesByCustomerId(appData, customer.id);
    const customerWeights = getWeightsToCustomer(customerPackages);
    const customerPrices = getPricesToCustomer(customerPackages);
    const invoice = {
      id: customer.id,
      name: customer.name,
      prices: customerPrices,
      weights: customerWeights,
    };
    allInvoices.push(invoice);
  });
  return allInvoices;
};

// handle funtion to  add New Package
const addPackage = (newPackageInfo, appData) => {
  const newPackage = {
    id: newPackageInfo.id,
    weight: `${newPackageInfo.weight}kg`,
    price: parseInt(newPackageInfo.price),
    shippingOrder: newPackageInfo.shippingOrder,
    customerid: parseInt(newPackageInfo.customerid),
  };
  const newPackages = [...appData.packages, newPackage];
  const newAppData = { customers: appData.customers, packages: newPackages };
  return { newAppData: newAppData };
};

//  handle funtion to validate  all inputs
const inputsValidation = (newPackageDetaile) => {
  const validateErrors = {
    id: "",
    weight: "",
    price: "",
    shippingOrder: "",
    customerid: "",
  };
  if (
    newPackageDetaile.price &&
    (newPackageDetaile.price === "" || newPackageDetaile.price < 0)
  ) {
    validateErrors.price = "Price should be a  POSITIVE number ";
  } else validateErrors.price = "";
  if (
    newPackageDetaile.weight &&
    (newPackageDetaile.weight === "" || newPackageDetaile.weight < 0)
  ) {
    validateErrors.weight = "Weight should be a POSITIVE  number";
  } else validateErrors.weight = "";
  return validateErrors;
};

//  handle funtion to check if  inputs  are empty or not

const checkInputEmpty = (newPackageDetaile) => {
  if (
    newPackageDetaile.customerid !== "" &&
    newPackageDetaile.weight !== "" &&
    newPackageDetaile.price !== ""
  )
    return true;
  return false;
};

export {
  getCustomerNameById,
  getPackagesByCustomerId,
  getPricesToCustomer,
  getWeightsToCustomer,
  getAllInvoices,
  addPackage,
  inputsValidation,
  checkInputEmpty,
};
