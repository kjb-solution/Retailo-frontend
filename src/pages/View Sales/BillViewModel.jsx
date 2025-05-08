import React from "react";
import DataTable from "react-data-table-component";
import { CloseSVG } from "../../assets/image";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";

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

// Define columns for the DataTable
const columns = [
  { name: "S.No", selector: (row) => row.sNo, center: true },
  { name: "Description", selector: (row) => row.description },
  { name: "Qty", selector: (row) => row.qty, center: true },
  { name: "Rate", selector: (row) => row.rate.toFixed(2), right: true },
  { name: "Total", selector: (row) => row.total.toFixed(2), right: true },
];

function BillViewModel({
  handleCloseModel,
  isModelOpen,
  setIsModelOpen,
  rowData,
}) {
  console.log(rowData);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            padding: "10px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          <div>Bill No: {rowData?.billNo || '-'}</div>
          <div>Date: {rowData?.billDate || '-'}</div>
        </div>

        {/* DataTable Section */}
        <DataTable
          columns={columns}
          data={billData}
          customStyles={customStyles}
          noHeader
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
  );
}
export default BillViewModel;
