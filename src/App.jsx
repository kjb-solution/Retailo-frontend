// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Master from "./pages/Master/Master";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/master" element={<Master />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
