// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import "./App.css";
import Billing from "./pages/Billing/Billing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Master from "./pages/Master/Master";
import Reports from "./pages/Restaurant/Restaurant";
import "bootstrap/dist/css/bootstrap.min.css";
import KOT from "./pages/KOT/KOT";
import KOT_BillingScreen from "./pages/KOT/KOT_BillingScreen";
import ResSales from "./pages/ResSales/ResSales";
import ItemWiseReport from "./pages/ItemWiseReport/ItemWiseReport";
import ViewSales from "./pages/View Sales/ViewSales";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/master" element={<Master />} />
          <Route path="/restaurant/billing" element={<Billing />} />
          {/* <Route path="/restaurant" element={<Reports />} /> */}
          <Route path="/restaurant/kot" element={<KOT />} />
          <Route
            path="/kot-billing-table/:tableNumber"
            element={<KOT_BillingScreen />}
          />
          <Route path="/restaurant/res-sales" element={<ResSales />} />
          <Route
            path="/reports/item-wise-report"
            element={<ItemWiseReport />}
          />
          <Route path="/view-sales" element={<ViewSales />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
