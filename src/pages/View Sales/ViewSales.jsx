import { FilePenLine, Printer, Filter, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Form, Button } from "react-bootstrap";
import { FaFileCsv, FaPrint } from "react-icons/fa6";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./ViewSales.css";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import { CloseSVG } from "../../assets/image";
import BillViewModel from "./BillViewModel";

function ViewSales() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const initialFilters = {
    fromDate: "",
    toDate: "",
    stName: "",
    rmNo: "",
    tableNo: "",
    department: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const columns = [
    { name: "S.No", width: "80px", center: true, selector: (row) => row.sno },
    { name: "Room No", center: true, selector: (row) => row.rmNo },
    { name: "Customer Name", selector: (row) => row.guestName },
    { name: "ST Name", selector: (row) => row.stName },
    { name: "Dept", selector: (row) => row.department },
    {
      name: "Bill No",
      width: "100px",
      center: true,
      selector: (row) => row.billNo,
    },
    { name: "Table No", center: true, selector: (row) => row.tableNumber },
    { name: "Date & Time", selector: (row) => row.billDate },
    { name: "G Tot", center: true, selector: (row) => row.grandTot },
    { name: "Col Amt", center: true, selector: (row) => row.collectedAmt },
    {
      name: "Details",
      center: true,
      cell: (row) => (
        <span
        // className={`${
        //   row.billStatus.toLowerCase() === "fullypaid"
        //     ? "paid"
        //     : row.billStatus.toLowerCase() === "unpaid"
        //     ? "unpaid"
        //     : null
        // }`}
        >
          {row.billStatus}
        </span>
      ),
    },
    {
      name: "",
      width: "80px",
      center: true,
      selector: (row) => row.action,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px",
        fontFamily: "Poppins, sans-serif",
        color: "#333",
        backgroundColor: "#f8f8f8",
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
        cursor: "pointer",
      },
    },
  };

  let allData = [
    {
      sno: 1,
      rmNo: "101",
      guestName: "John Doe",
      stName: "Waiter 1",
      department: "Food & Beverage",
      departmentFilter: "Food & Beverage",
      billNo: "BILL001",
      tableNumber: "T1",
      billDate: "01/05/2025 14:30",
      grandTot: 150.75,
      collectedAmt: 150.75,
      billStatus: "FullyPaid",
      action: actionIcons(),
    },
    {
      sno: 2,
      rmNo: "102",
      guestName: "Jane Smith",
      stName: "Waiter 2",
      department: "Bar",
      departmentFilter: "Bar",
      billNo: "BILL002",
      tableNumber: "T2",
      billDate: "02/05/2025 18:45",
      grandTot: 85.5,
      collectedAmt: 0,
      billStatus: "Unpaid",
      action: actionIcons(),
    },
    {
      sno: 3,
      rmNo: "103",
      guestName: "Alice Johnson",
      stName: "Waiter 1",
      department: "Food & Beverage",
      departmentFilter: "Food & Beverage",
      billNo: "BILL003",
      tableNumber: "T3",
      billDate: "03/05/2025 12:15",
      grandTot: 220.0,
      collectedAmt: 200.0,
      billStatus: "FullyPaid",
      action: actionIcons(),
    },
    {
      sno: 4,
      rmNo: "104",
      guestName: "Bob Brown",
      stName: "Waiter 3",
      department: "Room Service",
      departmentFilter: "Room Service",
      billNo: "BILL004",
      tableNumber: "T5",
      billDate: "04/05/2025 09:00",
      grandTot: 95.25,
      collectedAmt: 95.25,
      billStatus: "FullyPaid",
      action: actionIcons(),
    },
    {
      sno: 5,
      rmNo: "105",
      guestName: "Emma Wilson",
      stName: "Waiter 2",
      department: "Food & Beverage",
      departmentFilter: "Food & Beverage",
      billNo: "BILL005",
      tableNumber: "T4",
      billDate: "05/05/2025 20:00",
      grandTot: 175.8,
      collectedAmt: 0,
      billStatus: "Unpaid",
      action: actionIcons(),
    },
  ];

  const headers = [
    { label: "S.No", key: "sno" },
    { label: "Room No", key: "rmNo" },
    { label: "Customer Name", key: "guestName" },
    { label: "ST Name", key: "stName" },
    { label: "Dept", key: "department" },
    { label: "Bill No", key: "billNo" },
    { label: "Table No", key: "tableNumber" },
    { label: "Date & Time", key: "billDate" },
    { label: "G Tot", key: "grandTot" },
    { label: "Col Amt", key: "collectedAmt" },
    { label: "Details", key: "billStatus" },
  ];

  function actionIcons() {
    return (
      <span className="action-icons">
        {/* <FilePenLine size={16} color="green" /> */}
        Print
        <Printer size={16}  />
      </span>
    );
  }

  const filteredData = allData.filter((row) => {
    const [datePart, timePart] = row.billDate.split(" ");
    const [day, month, year] = datePart.split("/");
    const billDate = new Date(`${month}/${day}/${year} ${timePart}`);

    const billDateOnly = new Date(billDate);
    billDateOnly.setHours(0, 0, 0, 0);

    const fromDate = appliedFilters.fromDate
      ? new Date(appliedFilters.fromDate + "T00:00:00")
      : null;
    const toDate = appliedFilters.toDate
      ? new Date(appliedFilters.toDate + "T23:59:59.999")
      : null;

    return (
      (!appliedFilters.fromDate || billDate >= fromDate) &&
      (!appliedFilters.toDate || billDate <= toDate) &&
      (!appliedFilters.stName ||
        row.stName
          .toLowerCase()
          .includes(appliedFilters.stName.toLowerCase())) &&
      (!appliedFilters.rmNo || row.rmNo == appliedFilters.rmNo) &&
      (!appliedFilters.tableNo ||
        row.tableNumber
          .toLowerCase()
          .includes(appliedFilters.tableNo.toLowerCase())) &&
      (!appliedFilters.department ||
        row.departmentFilter
          .toLowerCase()
          .includes(appliedFilters.department.toLowerCase()))
    );
  });

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

  const handleClearFilter = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setShowFilter(false);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setIsModelOpen(true);
  };
  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  return (
    <div className="">
      <BillViewModel
        handleCloseModel={handleCloseModel}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        rowData={selectedRowData}
      />

      {showFilter && (
        <div className="filter-overlay" onClick={() => setShowFilter(false)} />
      )}
      <div
        className={`filter-panel ${showFilter ? "show" : ""}`}
        ref={filterRef}
      >
        {showFilter && (
          <div className="filter-content">
            <div className="drawer-header">
              <h5 className="slider-header">Filters</h5>
              <button
                className="close-btn"
                onClick={() => setShowFilter(false)}
              >
                <CloseSVG />
              </button>
            </div>
            {/* <hr /> */}
            <div className="filter-form">
              <div className="filter-form-fields">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Room No</Form.Label>
                <Form.Control
                  type="text"
                  name="rmNo"
                  value={filters.rmNo}
                  onChange={handleInputChange}
                  placeholder="Search Room No"
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Table No</Form.Label>
                <Form.Control
                  type="text"
                  name="tableNo"
                  value={filters.tableNo}
                  onChange={handleInputChange}
                  placeholder="Search Table No"
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  value={filters.department}
                  onChange={handleInputChange}
                  placeholder="Search Department"
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>ST Name</Form.Label>
                <Form.Control
                  type="text"
                  name="stName"
                  value={filters.stName}
                  onChange={handleInputChange}
                  placeholder="Search ST Name"
                />
              </div>
              <div className="filter-buttons">
                <button
                  className="theme-exit-btn"
                  variant="outline-secondary"
                  onClick={handleClearFilter}
                >
                  Clear Filter
                </button>
                <button className="theme-btn" onClick={handleApplyFilter}>
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>View Sales</h3>
        <span style={{ display: "flex", alignItems: "center" }}>
          {/* <div className="utility-buttons-container">
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
                  data={filteredData}
                  headers={headers}
                  onClick={() => {
                    return confirm("Do you want to export the data?");
                  }}
                  filename={`${new Date()
                    .toISOString()
                    .slice(0, 10)}_Res_Sales_Report.csv`}
                  className="csv-link"
                >
                  <FaFileCsv size={25} color="green" />
                </CSVLink>
              </div>
            </OverlayTrigger>
          </div> */}
          <button
            className="btn-create"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            // style={{ ":hover": { backgroundColor: "#233250" } }}
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </span>
      </div>
      <div className="data-table-records">
        <DataTable
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          fixedHeader
          striped
          responsive
          paginationPerPage={10}
          customStyles={customStyles}
          onRowClicked={handleRowClick}
        />
      </div>
    </div>
  );
}

export default ViewSales;
