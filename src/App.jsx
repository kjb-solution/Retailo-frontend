// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import "./App.css";
import Billing from "./pages/Billing/Billing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Master from "./pages/Master/Master";
import Reports from "./pages/Reports/Reports";
import "bootstrap/dist/css/bootstrap.min.css";
import KOT from "./pages/KOT/KOT";
import KOT_BillingScreen from "./pages/KOT/KOT_BillingScreen";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/master" element={<Master />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/kot" element={<KOT />} />
          <Route path="/kot-billing" element={<KOT_BillingScreen/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
