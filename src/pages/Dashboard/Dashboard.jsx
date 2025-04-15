import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaShoppingCart, FaUserClock, FaHistory } from "react-icons/fa";
import ChartComponent from "../../components/ChartComponent";
import LineChartComponent from "../../components/LineChartComponent";
import DoughnutChart from "../../components/DoughnutChart";
import DataTable from "react-data-table-component";

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
  const [money, setMoney] = useState(50);
  const [orders, setOrders] = useState(80);
  const [activeSessions, setActiveSessions] = useState(38);
  const [totalSessions, setTotalSessions] = useState(25);

  const calculateProgressWidth = (currentValue, maxValue) => {
    return (currentValue / maxValue) * 100;
  };

  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <div className="card-container">
        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Today's Money</p>
              <h2 className="card-value">{money.toLocaleString()}</h2>
            </div>
            <div className="card-icon">
              <FaCircleDollarToSlot />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-labels">
              <span>Money</span>
              <span>100</span>
            </div>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${calculateProgressWidth(money, 100)}%`,
                  background: "linear-gradient(to right, #f7971e, #fd5c63)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Orders</p>
              <h2 className="card-value">{orders.toLocaleString()}</h2>
            </div>
            <div className="card-icon">
              <FaShoppingCart />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-labels">
              <span>Orders</span>
              <span>100</span>
            </div>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${calculateProgressWidth(orders, 100)}%`,
                  background: "linear-gradient(to right, #3d72b4, #a2c0f8)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Active Sessions</p>
              <h2 className="card-value">{activeSessions.toLocaleString()}</h2>
            </div>
            <div className="card-icon">
              <FaUserClock />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-labels">
              <span>Active Sessions</span>
              <span>100</span>
            </div>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${calculateProgressWidth(activeSessions, 100)}%`,
                  background: "linear-gradient(to right, #27ae60, #a8e063)",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card1">
          <div className="card-content">
            <div className="card-text">
              <p className="card-label">Total Sessions</p>
              <h2 className="card-value">{totalSessions.toLocaleString()}</h2>
            </div>
            <div className="card-icon">
              <FaHistory />
            </div>
          </div>
          <div className="progress-container">
            <div className="progress-labels">
              <span>Total Sessions</span>
              <span>100</span>
            </div>
            <div className="progress-bar-wrapper">
              <div
                className="progress-bar-fill"
                style={{
                  width: `${calculateProgressWidth(totalSessions, 100)}%`,
                  background: "linear-gradient(to right, #7F7FD5, #E682FF)",
                }}
              ></div>
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
          <DoughnutChart />
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
