import React from "react";
import "./Dashboard.css";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaShoppingCart, FaUserClock, FaHistory } from "react-icons/fa";
import ChartComponent from "../../components/ChartComponent";
import LineChartComponent from "../../components/LineChartComponent";
import DataTable from "react-data-table-component";
import { Badge } from "react-bootstrap";

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      fontSize: "16px",
      fontFamily: "Poppins, sans-serif",
      color: "#333",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      fontFamily: "Poppins, sans-serif",
      color: "#444",
    },
  },
};

const columns = [
  {
    name: "Order ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Customer",
    selector: (row) => row.customer,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => `$${row.amount}`,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => {
      let badgeClass = "";
      if (row.status === "Completed") badgeClass = "badge-completed";
      else if (row.status === "Pending") badgeClass = "badge-pending";
      else if (row.status === "Cancelled") badgeClass = "badge-cancelled";

      return <span className={badgeClass}>{row.status}</span>;
    },
  },
  {
    name: "Date",
    selector: (row) => row.date,
  },
];

const data = [
  {
    id: "#001",
    customer: "Arun Kumar",
    amount: 530,
    status: "Completed",
    date: "2025-04-10",
  },
  {
    id: "#002",
    customer: "Meena Raj",
    amount: 270,
    status: "Pending",
    date: "2025-04-09",
  },
  {
    id: "#003",
    customer: "John Doe",
    amount: 150,
    status: "Completed",
    date: "2025-04-08",
  },
  {
    id: "#004",
    customer: "Sara Lee",
    amount: 600,
    status: "Pending",
    date: "2025-04-07",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <div className="card-container">
        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Today's Money</p>
              <h2 className="card-value">$53k</h2>
              <p className="card-status">
                <span className="status-green">+55%</span> than last week
              </p>
            </div>
            <div className="card-icon">
              <FaCircleDollarToSlot />
            </div>
          </div>
        </div>
        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Orders</p>
              <h2 className="card-value">$40K</h2>
              <p className="card-status">
                <span className="status-green">+32%</span> than last week
              </p>
            </div>
            <div className="card-icon">
              <FaShoppingCart />
            </div>
          </div>
        </div>

        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Active Sessions</p>
              <h2 className="card-value">$15K</h2>
              <p className="card-status">
                <span className="status-green">+12%</span> than last week
              </p>
            </div>
            <div className="card-icon">
              <FaUserClock />
            </div>
          </div>
        </div>

        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Total Sessions</p>
              <h2 className="card-value">$20K</h2>
              <p className="card-status">
                <span className="status-green">+20%</span> than last week
              </p>
            </div>
            <div className="card-icon">
              <FaHistory />
            </div>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div className="card1">
          <ChartComponent />
        </div>
        <div className="card1">
          <LineChartComponent />
        </div>
        <div className="card1">
          <LineChartComponent />
        </div>
      </div>

      <div className="table-card" style={{ padding: "14px" }}>
        <div className="table-header">
          <h4>Orders Table</h4>
        </div>
        <div className="data-table-section">
          <DataTable
            columns={columns}
            data={data}
            pagination
            responsive
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
