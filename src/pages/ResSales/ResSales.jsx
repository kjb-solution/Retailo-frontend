import { FilePenLine, Printer, Filter, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";

import "./ResSales.css";
import { FaFileCsv, FaPrint } from "react-icons/fa6";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import ResSalesFilterUI from "./ResSalesFilterUI";

function ResSales() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const initialFilters = {
    fromDate: "",
    toDate: "",
    billStatus: "",
    stName: "",
    billNo: "",
    rmNo: "",
    tableNo: "",
    billType: "",
    pMode: "",
    entityName: "",
    postFrom: "",
    department: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const columns = [
    { name: "S.No", center: true, selector: (row) => row.sno },
    {
      name: "Date&Time",

      selector: (row) => row.billDate,
    },
    {
      name: "RM No",
      center: true,
      selector: (row) => row.rmNo,
    },
    { name: "Guest Name", selector: (row) => row.guestName },
    { name: "Bill No", selector: (row) => row.billNo },
    { name: "Table No", center: true, selector: (row) => row.tableNumber },
    { name: "KOT No", center: true, selector: (row) => row.kotNo },
    { name: "NOP", center: true, selector: (row) => row.nop },
    { name: "Net Tot", center: true, selector: (row) => row.netTot },
    { name: "Disc", center: true, selector: (row) => row.disc },
    { name: "State GST", center: true, selector: (row) => row.stateGST },
    { name: "Central GST", center: true, selector: (row) => row.centralGST },
    { name: "Sales Tax", center: true, selector: (row) => row.salesTax },
    { name: "Service Charge", center: true, selector: (row) => row.charge },
    { name: "Grand Tot", center: true, selector: (row) => row.grandTot },
    { name: "Pay Mode", center: true, selector: (row) => row.payMode },
    { name: "Amount", selector: (row) => row.billAmount },
    {
      name: "Status",
      center: true,
      cell: (row) => (
        <span
          className={`${
            row.billStatus.toLowerCase() === "paid"
              ? "paid"
              : row.billStatus.toLowerCase() === "unpaid"
              ? "unpaid"
              : null
          }`}
        >
          {row.billStatus}
        </span>
      ),
    },
    // {
    //   name: "Action",
    //   center: true,
    //   selector: (row) => row.action,
    // },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        color: "#333",
        backgroundColor: "#f8f8f8", // Light background for headers
        padding: "12px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontFamily: "Poppins, sans-serif",
        color: "#444",
        padding: "10px",
      },
    },
    rows: {
      style: {
        "&:last-child": {
          fontWeight: "bold",
          backgroundColor: "#F1EFEC",
          fontSize: "16px",
        },
      },
    },
  };

  let allData = [
    {
      sno: 1,
      billDate: "24/04/2025 7:47 am",
      rmNo: 0,
      guestName: "Alphonse Irudaya Sakayaraj",
      billNo: "RF/281",
      tableNumber: "T1",
      kotNo: 2581,
      nop: 0,
      netTot: 57.14,
      disc: 0.0,
      stateGST: 1.43,
      centralGST: 1.43,
      salesTax: 0.0,
      charge: 0.0,
      grandTot: 60.0,
      payMode: "Cash",
      billAmount: "₹60.00",
      billStatus: "Paid",
      action: actionIcons(),
      status: "Paid",
      billType: "RF",
      entityName: "Alphonse Irudaya Sakayaraj",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 2,
      billDate: "24/04/2025 7:45 am",
      rmNo: 3,
      guestName: "Karthis Sundaram",
      billNo: "RSF/901",
      tableNumber: "T7",
      kotNo: 2598,
      nop: 0,
      netTot: 51.43,
      disc: 0.0,
      stateGST: 1.43,
      centralGST: 1.43,
      salesTax: 0.0,
      charge: 0.57,
      grandTot: 55.0,
      payMode: "Credit Card",
      billAmount: "₹55.00",
      billStatus: "Unpaid",
      action: actionIcons(),
      status: "Unpaid",
      billType: "RSF",
      entityName: "Karthis Sundaram",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 3,
      billDate: "23/04/2025 8:11 am",
      rmNo: 2,
      guestName: "Arun Kumar",
      billNo: "RSF/063",
      tableNumber: "T2",
      kotNo: 2562,
      nop: 0,
      netTot: 51.43,
      disc: 0.0,
      stateGST: 1.43,
      centralGST: 1.43,
      salesTax: 0.0,
      charge: 0.57,
      grandTot: 55.0,
      payMode: "UPI",
      billAmount: "₹55.00",
      billStatus: "Paid",
      action: actionIcons(),
      status: "Paid",
      billType: "RSF",
      entityName: "Arun Kumar",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 4,
      billDate: "24/04/2025 9:12 am",
      rmNo: 8,
      guestName: "Rajasear Senthurai",
      billNo: "RSF/094",
      tableNumber: "T9",
      kotNo: 2563,
      nop: 0,
      netTot: 51.43,
      disc: 0.0,
      stateGST: 1.43,
      centralGST: 1.43,
      salesTax: 0.0,
      charge: 0.57,
      grandTot: 55.0,
      payMode: "Cash",
      billAmount: "₹55.00",
      billStatus: "Unpaid",
      action: actionIcons(),
      status: "Unpaid",
      billType: "RSF",
      entityName: "Rajasear Senthurai",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 5,
      billDate: "25/04/2025 10:04 am",
      rmNo: 9,
      guestName: "Rajasear Senthurai",
      billNo: "RSF/096",
      tableNumber: "T2",
      kotNo: 2565,
      nop: 0,
      netTot: 51.43,
      disc: 0.0,
      stateGST: 1.43,
      centralGST: 1.43,
      salesTax: 0.0,
      charge: 0.0,
      grandTot: 55.0,
      payMode: "Credit Card",
      billAmount: "₹55.00",
      billStatus: "Unpaid",
      action: actionIcons(),
      status: "Unpaid",
      billType: "RSF",
      entityName: "Rajasear Senthurai",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 6,
      billDate: "24/04/2025 11:51 am",
      rmNo: 2,
      guestName: "Rajasear Senthurai",
      billNo: "RSF/087",
      tableNumber: "T2",
      kotNo: 2378,
      nop: 0,
      netTot: 295.24,
      disc: 0.0,
      stateGST: 5.24,
      centralGST: 5.24,
      salesTax: 0.0,
      charge: 31.45,
      grandTot: 331.73,
      payMode: "UPI",
      billAmount: "₹331.73",
      billStatus: "Unpaid",
      action: actionIcons(),
      status: "Unpaid",
      billType: "RSF",
      entityName: "Rajasear Senthurai",
      postFrom: "Food",
      department: "Food",
    },
  ];

  const headers = [
    { label: "S.No", key: "sno" },
    { label: "Date&Time", key: "billDate" },
    { label: "RM No", key: "rmNo" },
    { label: "Guest Name", key: "guestName" },
    { label: "Bill No", key: "billNo" },
    { label: "Table No", key: "tableNumber" },
    { label: "KOT No", key: "kotNo" },
    { label: "NOP", key: "nop" },
    { label: "Net Tot", key: "netTot" },
    { label: "Disc", key: "disc" },
    { label: "State GST", key: "stateGST" },
    { label: "Central GST", key: "centralGST" },
    { label: "Sales Tax", key: "salesTax" },
    { label: "Service Charge", key: "charge" },
    { label: "Grand Tot", key: "grandTot" },
    { label: "Pay Mode", key: "payMode" },
    { label: "Amount", key: "billAmount" },
    { label: "Status", key: "billStatus" },
  ];

  function actionIcons() {
    return (
      <span className="action-icons">
        <FilePenLine size={16} color="green" />
        <Printer size={16} color="#3A59D1" />
      </span>
    );
  }

  const filteredData = allData
    .filter((row) => !row.isFooter) // Exclude footer from filtering
    .filter((row) => {
      // Parse the billDate string (format: "24/04/2025 11:51 am")
      const [datePart, timePart] = row.billDate.split(" ");
      const [day, month, year] = datePart.split("/");
      const billDate = new Date(`${month}/${day}/${year} ${timePart}`);

      // Get date-only portion (set time to 00:00:00)
      const billDateOnly = new Date(billDate);
      billDateOnly.setHours(0, 0, 0, 0);

      // Convert filter dates to Date objects
      const fromDate = appliedFilters.fromDate
        ? new Date(appliedFilters.fromDate + "T00:00:00")
        : null;
      const toDate = appliedFilters.toDate
        ? new Date(appliedFilters.toDate + "T23:59:59.999")
        : null;

      return (
        (!appliedFilters.fromDate || billDate >= fromDate) &&
        (!appliedFilters.toDate || billDate <= toDate) &&
        (!appliedFilters.billStatus ||
          row.status.toLowerCase() ===
            appliedFilters.billStatus.toLowerCase()) &&
        (!appliedFilters.stName ||
          row.guestName
            .toLowerCase()
            .includes(appliedFilters.stName.toLowerCase())) &&
        (!appliedFilters.billNo ||
          row.billNo
            .toLowerCase()
            .includes(appliedFilters.billNo.toLowerCase())) &&
        (!appliedFilters.rmNo || row.rmNo == appliedFilters.rmNo) &&
        (!appliedFilters.tableNo ||
          row.tableNumber
            .toLowerCase()
            .includes(appliedFilters.tableNo.toLowerCase())) &&
        (!appliedFilters.billType ||
          row.billType.toLowerCase() ===
            appliedFilters.billType.toLowerCase()) &&
        (!appliedFilters.pMode ||
          row.payMode
            .toLowerCase()
            .includes(appliedFilters.pMode.toLowerCase())) &&
        (!appliedFilters.entityName ||
          row.entityName
            .toLowerCase()
            .includes(appliedFilters.entityName.toLowerCase())) &&
        (!appliedFilters.postFrom ||
          row.postFrom
            .toLowerCase()
            .includes(appliedFilters.postFrom.toLowerCase())) &&
        (!appliedFilters.department ||
          row.department
            .toLowerCase()
            .includes(appliedFilters.department.toLowerCase()))
      );
    });

  // Append footerData to filteredData to ensure it always appears
  // const tableData = [...filteredData, footerData];
  // Calculate totals for footer
  const calculateTotals = () => {
    const totals = {
      netTot: 0,
      disc: 0,
      stateGST: 0,
      centralGST: 0,
      salesTax: 0,
      charge: 0,
      grandTot: 0,
    };

    filteredData.forEach((row) => {
      totals.netTot += parseFloat(row.netTot) || 0;
      totals.disc += parseFloat(row.disc) || 0;
      totals.stateGST += parseFloat(row.stateGST) || 0;
      totals.centralGST += parseFloat(row.centralGST) || 0;
      totals.salesTax += parseFloat(row.salesTax) || 0;
      totals.charge += parseFloat(row.charge) || 0;
      totals.grandTot += parseFloat(row.grandTot) || 0;
    });

    return totals;
  };

  const totals = calculateTotals();
  // Create footerData based on filtered totals
  const footerData = {
    sno: "",
    billDate: "",
    rmNo: "",
    guestName: "",
    billNo: "",
    tableNumber: "",
    kotNo: "",
    nop: totals.nop,
    netTot: totals.netTot.toFixed(2),
    disc: totals.disc.toFixed(2),
    stateGST: totals.stateGST.toFixed(2),
    centralGST: totals.centralGST.toFixed(2),
    salesTax: totals.salesTax.toFixed(2),
    charge: totals.charge.toFixed(2),
    grandTot: totals.grandTot.toFixed(2),
    payMode: "",
    billAmount: "",
    billStatus: "",
    // action: "",
    status: "",
    billType: "",
    entityName: "",
    postFrom: "",
    department: "",
    isFooter: true,
  };

  // Combine filteredData with updated footerData
  const tableData = [...filteredData, footerData];
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    }
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
    setShowFilter(false);
  };
  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleClearFilter = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setShowFilter(false);
  };

  // Unique options for dropdowns
  const payModeOptions = [...new Set(allData.map((row) => row.payMode))];
  const entityNameOptions = [...new Set(allData.map((row) => row.entityName))];
  const postFromOptions = [...new Set(allData.map((row) => row.postFrom))];
  const departmentOptions = [...new Set(allData.map((row) => row.department))];

  return (
    <div className="res-sales-container">
      {showFilter && (
        <div className="filter-overlay" onClick={() => setShowFilter(false)} />
      )}
      <div
        className={`filter-panel ${showFilter ? "show" : ""}`}
        ref={filterRef}
      >
        {showFilter && (
          <ResSalesFilterUI
            filters={filters}
            setFilters={setFilters}
            setShowFilter={setShowFilter}
            handleInputChange={handleInputChange}
            handleApplyFilter={handleApplyFilter}
            handleClearFilter={handleClearFilter}
            payModeOptions={payModeOptions}
            entityNameOptions={entityNameOptions}
            postFromOptions={postFromOptions}
            departmentOptions={departmentOptions}

          />
         
        )}
      </div>

      <div className="top-header">
        <h3 className="res-sales-title" style={{placeSelf:"flex-start"}}>Restaurant Sales Report</h3>
        <span style={{ display: "flex", alignItems: "center" }}>
          <div className="utility-buttons-container">
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 100 }}
              overlay={<Tooltip id="csv-export-tooltip">Print Table</Tooltip>}
            >
              <FaPrint size={25} color="rgb(58, 89, 209)" />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 100, hide: 100 }}
              overlay={<Tooltip id="csv-export-tooltip">Export CSV</Tooltip>}
            >
              <div>
                <CSVLink
                  data={tableData}
                  headers={headers}
                  onClick={() => {
                    return confirm("DO you want to export the data?");
                  }}
                  filename={`${new Date()
                    .toISOString()
                    .slice(0, 10)}_Restaurant_Sales_Report.csv`}
                  className="csv-link"
                >
                  <FaFileCsv size={25} color="green" />
                </CSVLink>
              </div>
            </OverlayTrigger>
          </div>
          <button
            className="filter-btn"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            style={{ ":hover": { backgroundColor: "#233250" } }}
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </span>
      </div>
      <div className="data-table-records">
        <DataTable
          columns={columns}
          data={tableData}
          highlightOnHover
          pagination
          fixedHeader
          striped
          responsive
          fixedHeaderScrollHeight="70vh"
          paginationPerPage={100}
          customStyles={customStyles}
        />
      </div>
      <div className="res-sales-details-container">
        <div className="res-sales-container1">
          <h5>Restaurant Sales Details</h5>
          <div className="res-sales-details">
            {[
              ["Restaurants Food Sales", "685.71"],
              ["Home Delivery", "0.00"],
              ["Parcel Sales", "0.00"],
              ["Parcel Charge", "0.00"],
              ["Discount", "0.00"],
              ["Net Sales", "685.71"],
              ["State GST", "17.14"],
              ["Central GST", "17.14"],
              ["Total Sales", "720.00"],
              ["Cash", "0.00"],
              ["Card", "0.00"],
              ["Credit", "0.00"],
              ["Room", "660.00"],
              ["Bank", "60.00"],
              ["Total Collection", "720.00"],
            ].map(([label, value], index) => (
              <div
                key={index}
                className="res-sales-details-item"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "49%" }}>{label}</div>
                <span>:</span>
                <div style={{ width: "49%", textAlign: "right" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="res-sales-container2">
          <h5>Sales Details</h5>
          <div className="room-services-details">
            {[
              ["Room Service Sales", "1142.80"],
              ["Discount", "0.00"],
              ["Net Sales", "1142.80"],
              ["State GST", "28.58"],
              ["Central GST", "28.58"],
              ["Service Charge", "65.71"],
              ["Total Sales", "1267.00"],
              ["Cash", "0.00"],
              ["Card", "0.00"],
              ["Credit", "0.00"],
              ["Room", "1267.00"],
              ["Bank", "0.00"],
              ["Total Collection", "1267.00"],
            ].map(([label, value], index) => (
              <div
                key={index}
                className="room-services-details-item"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ width: "49%" }}>{label}</div>
                <span>:</span>
                <div style={{ width: "49%", textAlign: "right" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResSales;
