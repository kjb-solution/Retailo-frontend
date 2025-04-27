import React, { useState } from "react";
import KOT_BookedView from "./KOT_BookedView";
import KOT_Tables from "./KOT_Tables";
import "./KOT.css";
const isMobile = window.innerWidth < 1024;

function KOT() {
  const [activeTab, setActiveTab] = useState("Tables");

  return (
    <span style={{ backgroundColor: "#f5f6fa" }}>
      <h4 style={{ padding: "0px 10px" }}>Create KOT</h4>
      <div className="KOT-container">
        {/* mobile nav header */}
        <div className="mobile-kot-nav-header">
          <div
            onClick={() => setActiveTab("Tables")}
            className={`${
              activeTab === "Tables" ? "active-kot-nav-header-main" : null
            }`}
          >
            Tables
          </div>
          <div
            onClick={() => setActiveTab("Billing")}
            className={`${
              activeTab === "Billing" ? "active-kot-nav-header-main" : null
            }`}
          >
            Billing Tables
          </div>
        </div>
        {isMobile ? (
          <>
            {activeTab === "Tables" && <KOT_Tables />}
            {activeTab === "Billing" && <KOT_BookedView />}
          </>
        ) : null}
        {!isMobile ? (
          <>
            <KOT_BookedView />
            <KOT_Tables />
          </>
        ) : null}
      </div>
    </span>
  );
}

export default KOT;
