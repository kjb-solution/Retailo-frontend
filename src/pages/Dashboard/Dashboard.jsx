import React from "react";
import Layout from "../../Layout/Layout";
import "./Dashboard.css";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaShoppingCart, FaUserClock, FaHistory } from "react-icons/fa";
import ChartComponent from "../../components/ChartComponent";
import LineChartComponent from "../../components/LineChartComponent";

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="card-container">
          <div className="card1">
            <div className="revenue">
              <div className="active-card">
                <h3>Total Revenue </h3>
                <p>10</p>
              </div>
              <FaCircleDollarToSlot className="icons" />
            </div>
          </div>
          <div className="card1">
            <div className="revenue">
              <div className="active-card">
                <h3>Orders </h3>
                <p>40</p>
              </div>
              <FaShoppingCart className="icons" />
            </div>
          </div>
          <div className="card1">
            <div className="revenue">
              <div className="active-card">
                <h3>Active Sessions </h3>
                <p>15</p>
              </div>
              <FaUserClock className="icons" />
            </div>
          </div>
          <div className="card1">
            <div className="revenue">
              <div className="active-card">
                <h3>Total Sessions </h3>
                <p>20</p>
              </div>
              <FaHistory className="icons" />
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="card large">
            <ChartComponent />
          </div>
          <div className="card large">
            <LineChartComponent />
          </div>
          <div className="card large">
            <LineChartComponent />
          </div>
        </div>

        <div className="card-section">
          <div className="card">Orders Overview</div>
          <div className="card">Top Categories</div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
