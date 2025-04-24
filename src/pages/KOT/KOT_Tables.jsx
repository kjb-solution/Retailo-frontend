import React from "react";

function KOT_Tables() {
  const tableData = [
    {
      id: 1,
      table_no: "B1",
      status: "Booked",
      time: "10:30",
      totalAmount: "₹1000",
    },
    {
      id: 2,
      table_no: "B2",
      status: "Free",
      time: "",
      totalAmount: "₹0",
    },
    {
      id: 3,
      table_no: "B3",
      status: "Booked",
      time: "11:30",
      totalAmount: "₹2000",
    },
    {
      id: 4,
      table_no: "B4",
      status: "Free",
      time: "",
      totalAmount: "₹0",
    },
    {
      id: 5,
      table_no: "B3",
      status: "Booked",
      time: "11:30",
      totalAmount: "₹2000",
    },
    {
      id: 6,
      table_no: "B4",
      status: "Free",
      time: "",
      totalAmount: "₹0",
    },
  ];
  return (
    <div className="KOT-table-container">
      {/* table card */}
      {tableData.map((table) => (
        <div
          onClick={() => {
            console.log(table);
          }}
          key={table.id}
          className={`KOT-table-card ${
            table.status === "Booked" ? "booked" : "free"
          }`}
        >
          <div className="KOT-table-number">{table.table_no}</div>
          <div className="KOT-table-card-content">
            {/* <div className="KOT-table-status">{table.status}</div> */}
            <div className="KOT-table-total-amount">{table.totalAmount}</div>
          </div>
          {/* footer  */}
          <div className="KOT-table-footer">
            <div
              className="KOT-table-time"
              style={{ opacity: table.time ? 1 : 0 }}
            >
              Time :{table.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KOT_Tables;
