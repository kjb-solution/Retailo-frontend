import DataTable from "react-data-table-component";
import { CloseSVG } from "../../../assets/image";
import React, { useState } from "react";


// Custom styles for the DataTable to match the bill layout
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
// Sample data based on the bill image
const billData = [
  {
    sNo: 1,
    description: "Black And White - L",
    qty: 4,
    rate: 200.87,
    total: 803.48,
  },
  {
    sNo: 2,
    description: "KF Strong Beer",
    qty: 1,
    rate: 227.07,
    total: 227.07,
  },
];

const summaryData = {
  netQty: 5,
  total: 1030.55,
  sGST: 0.0,
  cGST: 0.0,
  salesTax: 149.43,
  grandTotal: 1180.0,
};

function BillViewModel({
  handleCloseModel,
  isModelOpen,
  setIsModelOpen,
  rowData,
}) {
  console.log(rowData);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Define columns for the DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row) => row.sNo,
      center: true,
      width: isMobile ? "70px" : "",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: isMobile ? "70px" : "",
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      center: true,
      width: isMobile ? "70px" : "100px",
    },
    {
      name: "Rate",
      selector: (row) => row.rate.toFixed(2),
      width: isMobile ? "70px" : "100px",
    },
    {
      name: "Total",
      selector: (row) => row.total.toFixed(2),
      width: isMobile ? "70px" : "100px",
    },
  ];
  return (
    <div className="bill-view-model">
      {isModelOpen && (
        <div className="filter-overlay" onClick={() => setIsModelOpen(false)} />
      )}
      <div className={`open-panel ${isModelOpen ? "show" : ""}`}>
        {/* Header Section */}
        <div className="drawer-header">
          <h5 className="slider-header">Sales Details</h5>
          <button className="close-btn" onClick={handleCloseModel}>
            <CloseSVG />
          </button>
        </div>
        <div className="bill-view-header">
          <div>PO No: {rowData?.poNo || "-"}</div>
          <div>Date: {rowData?.date || "-"}</div>
        </div>
        <div className="bill-view-container">
          {/* DataTable Section */}
          <DataTable
            columns={columns}
            data={billData}
            customStyles={customStyles}
            striped
            highlightOnHover
            dense
          />
          <hr style={{ margin: "20px 0" }} />
          {/* Summary Section */}
          <div
            className="billing-footer"
            style={{ textAlign: "right", marginTop: "20px", padding: "10px" }}
          >
            <div>Net Qty: {summaryData.total.toFixed(2)}</div>
            <div>Total: {summaryData.total.toFixed(2)}</div>
            <div>SGST: {summaryData.sGST.toFixed(2)}</div>
            <div>CGST: {summaryData.cGST.toFixed(2)}</div>
            <div>Sales Tax: {summaryData.salesTax.toFixed(2)}</div>
            <div
              style={{
                fontWeight: "bold",
                borderTop: "1px dashed #000",
                borderBottom: "1px dashed #000",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Grand Total: {summaryData.grandTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BillViewModel;
