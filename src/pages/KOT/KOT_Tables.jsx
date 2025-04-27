import { CircleCheck, SquareArrowOutUpRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Animation_Timer from "../../assets/Animation_Timer.webm";

function KOT_Tables() {
  const navigate = useNavigate();
  
  const [filter, setFilter] = useState("All");

  const tableData = [
    { id: 1, table_no: "B1", status: "Occupied", time: "10:30", totalAmount: "₹1000", availableSeats: 0, totalSeats: 4, staffName: "John" },
    { id: 2, table_no: "B2", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 3, table_no: "B3", status: "Occupied", time: "11:30", totalAmount: "₹2000", availableSeats: 0, totalSeats: 4, staffName: "Mike" },
    { id: 4, table_no: "B4", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 5, table_no: "B5", status: "Occupied", time: "11:30", totalAmount: "₹2000", availableSeats: 0, totalSeats: 4, staffName: "Muthukumar" },
    { id: 6, table_no: "B6", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 7, table_no: "B7", status: "Occupied", time: "12:00", totalAmount: "₹1500", availableSeats: 0, totalSeats: 4, staffName: "Sarah" },
    { id: 8, table_no: "B8", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 9, table_no: "B9", status: "Occupied", time: "12:15", totalAmount: "₹800", availableSeats: 0, totalSeats: 4, staffName: "David" },
    { id: 10, table_no: "B10", status: "Occupied", time: "12:45", totalAmount: "₹2500", availableSeats: 0, totalSeats: 4, staffName: "Emily" },
    { id: 11, table_no: "B11", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 12, table_no: "B12", status: "Occupied", time: "13:00", totalAmount: "₹1200", availableSeats: 0, totalSeats: 4, staffName: "Chris" },
    { id: 13, table_no: "B13", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 14, table_no: "B14", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
    { id: 15, table_no: "B15", status: "Occupied", time: "13:30", totalAmount: "₹1800", availableSeats: 0, totalSeats: 4, staffName: "Jessica" },
    { id: 16, table_no: "B16", status: "Available", time: "", totalAmount: "₹0", availableSeats: 4, totalSeats: 4, staffName: "" },
  ];

  // Sort tables based on filter
  const sortedTables = [...tableData].sort((a, b) => {
    if (filter === "All") return 0;
    if (a.status === filter && b.status !== filter) return -1;
    if (a.status !== filter && b.status === filter) return 1;
    return 0;
  });

  return (
    <div className="KOT-table-container-wrapper" style={{display: "flex", flexDirection: "column",width: "100%"}}>
    {/* Tabs */}
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {["All", "Available", "Occupied"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            
            style={{
              padding: "8px 16px",
              borderRadius: "5px",
              border: filter === tab ? "2px solid #000" : "1px solid #ccc",
              background: filter === tab ? "#000" : "#fff",
              color: filter === tab ? "#fff" : "#000",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="KOT-table-container-main-wrapper">

    <div className="KOT-table-container-main">

      {/* Table Cards */}
      {sortedTables.map((table) => (
        <div
          onClick={() => navigate(`/kot-billing-table/${table.table_no}`)}
          key={table.id}
          className={`KOT-table-card ${
            table.status === "Occupied" ? "booked" : "free"
          }`}
        >
          <div className="KOT-table-number">{table.table_no}</div>
          <span className="KOT-open-icon">
            <SquareArrowOutUpRight size={17} />
          </span>
          <div className="KOT-table-card-content">
            {table.totalAmount === "₹0" ? (
              <div style={{ textAlign: "center", width: "100%", fontWeight: "bold" }}>
           Seats : {table.availableSeats}
              </div>
            ) : (
              <>
                <div className="KOT-table-staff-name">{table.staffName}</div>
                <div className="KOT-table-total-amount">{table.totalAmount}</div>
              </>
            )}
          </div>
          {/* Footer */}
          <div className="KOT-table-footer">
            <div
              className="KOT-table-time"
              style={{ opacity: table.time ? 1 : 0 }}
            >
              Time : {table.time}
            </div>
            <div>
              {table.status === "Occupied" ? (
                <div className="KOT-table-status-occupied">
                  <video
                    src={Animation_Timer}
                    alt="timer"
                    autoPlay
                    loop
                    style={{ width: "17px" }}
                  />
                  Occupied
                </div>
              ) : (
                <div className="KOT-table-status-free">
                  <CircleCheck size={17} color="lightgreen" />
                  Available
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}

export default KOT_Tables;
