import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pakages from "./pages/packageList";
import Customers from "./pages/customerList";
import NavBar from "./components/Navbar";
import InvoicesList from "./pages/invoicesList";
import Invoice from "./pages/invoces";
import DeliveryProvider from "./context";
import "./App.css";

function App() {
  return (
    <div>
      {/* set Context  such as a wrapper */}
      <DeliveryProvider>
         {/* setting routes */}
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Customers />
            </Route>
            <Route exact path="/pakage">
              <Pakages />
            </Route>
            <Route exact path="/invoices">
              <InvoicesList />
            </Route>
            <Route exact path="/invoice/:customerId">
              <Invoice />
            </Route>
          </Switch>
        </Router>
      </DeliveryProvider>
    </div>
  );
}

export default App;
