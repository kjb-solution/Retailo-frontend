import { FilePenLine, Printer, Filter, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Form, Button } from "react-bootstrap";
import { FaFileCsv, FaPrint } from "react-icons/fa6";
import { CSVLink } from "react-csv";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../../View Sales/ViewSales.css";
import { CloseSVG } from "../../../assets/image";
import BillViewModel from "./BillViewModel";

function GRNReport() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [data, setData] = useState([
    {
      sno: 1,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-309",
      poNo: "PO-308",
      date: "07/05/2025",
      time: "04:49 PM",
      suppName: "Local Purchase",
      itemName: "Miscellaneous",
      invNo: "",
      total: 2400.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 2400.0,
      mode: "Cash",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 2,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-310",
      poNo: "PO-309",
      date: "07/05/2025",
      time: "04:51 PM",
      suppName: "Local Purchase",
      itemName: "Miscellaneous",
      invNo: "",
      total: 1008.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 1008.0,
      mode: "Cash",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 3,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-311",
      poNo: "PO-310",
      date: "07/05/2025",
      time: "04:52 PM",
      suppName: "Kanthan Milk Tenkasi",
      itemName: "Milk",
      invNo: "203",
      total: 800.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 800.0,
      mode: "Credit",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 4,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-312",
      poNo: "PO-311",
      date: "07/05/2025",
      time: "04:57 PM",
      suppName: "Thangam Brothers",
      itemName: "Miscellaneous",
      invNo: "4",
      total: 1703.62,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 1703.62,
      mode: "Credit",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 5,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-313",
      poNo: "PO-312",
      date: "07/05/2025",
      time: "04:59 PM",
      suppName: "Local Purchase",
      itemName: "Miscellaneous",
      invNo: "",
      total: 1367.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 1367.0,
      mode: "Cash",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 6,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-314",
      poNo: "PO-313",
      date: "07/05/2025",
      time: "04:59 PM",
      suppName: "Sri Venkateswara Sweet Stall",
      itemName: "Sweets",
      invNo: "81",
      total: 520.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 520.0,
      mode: "Cash",
      action: "",
      isTotalRow: false,
    },
    {
      sno: 7,
      userName: "Revathi",
      department: "Main Store",
      grnNo: "GRN-315",
      poNo: "PO-314",
      date: "07/05/2025",
      time: "05:00 PM",
      suppName: "Popular Papers and printers",
      itemName: "Paper",
      invNo: "1085",
      total: 5670.0,
      sgst: 0.0,
      cgst: 0.0,
      round: 0.0,
      grandTotal: 5670.0,
      mode: "Credit",
      action: "",
      isTotalRow: false,
    },
  ]);

  const initialFilters = {
    fromDate: "",
    toDate: "",
    suppName: "",
    grnNo: "",
    poNo: "",
    department: "",
    itemName: "",
    paymentMode: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const columns = [
    { name: "S.No", width: "80px", center: true, selector: (row) => row.sno },
    { name: "User Name", selector: (row) => row.userName },
    { name: "Dept", selector: (row) => row.department },
    {
      name: "GRN No",
      width: "100px",
      center: true,
      selector: (row) => row.grnNo,
    },
    {
      name: "PO No",
      width: "100px",
      center: true,
      selector: (row) => row.poNo,
    },
    { name: "Date", selector: (row) => row.date },
    { name: "Time", selector: (row) => row.time },
    { name: "Supp Name", selector: (row) => row.suppName },
    { name: "Inv No", center: true, selector: (row) => row.invNo },
    { name: "Total", center: true, selector: (row) => row.total },
    { name: "SGST", center: true, selector: (row) => row.sgst },
    { name: "CGST", center: true, selector: (row) => row.cgst },
    { name: "Round", center: true, selector: (row) => row.round },
    { name: "Grand Total", center: true, selector: (row) => row.grandTotal },
    { name: "Mode", center: true, selector: (row) => row.mode },
    {
      name: "",
      width: "80px",
      center: true,
      cell: (row) =>
        !row.isTotalRow ? (
          <span className="action-icons">
            Print
            <Printer size={16} />
            {/* <X size={16} color="red" onClick={() => handleDeleteRow(row)} /> */}
          </span>
        ) : null,
    },
    {
      name: "",
      width: "80px",
      center: true,
      cell: (row) =>
        !row.isTotalRow ? (
          <span className="delete-action-icons">
            {/* <FilePenLine size={16} color="blue" /> */}
            {/* <Printer size={16} /> */}
            <X size={16} onClick={() => handleDeleteRow(row)} />
          </span>
        ) : null,
    },
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
        
        cursor: "pointer",
        "&:last-child": {
          fontWeight: "bold",
          backgroundColor: "#F1EFEC",
          fontSize: "16px",
        },
      },
    },
  };

  const filteredDataWithoutTotal = data.filter((row) => {
    const billDate = new Date(`${row.date} ${row.time}`);

    const billDateOnly = new Date(billDate);
    billDateOnly.setHours(0, 0, 0, 0);

    const fromDate = appliedFilters.fromDate
      ? new Date(appliedFilters.fromDate + "T00:00:00")
      : null;
    const toDate = appliedFilters.toDate
      ? new Date(appliedFilters.toDate + "T23:59:59.999")
      : null;

    return (
      !row.isTotalRow &&
      (!appliedFilters.fromDate || billDate >= fromDate) &&
      (!appliedFilters.toDate || billDate <= toDate) &&
      (!appliedFilters.suppName ||
        row.suppName
          .toLowerCase()
          .includes(appliedFilters.suppName.toLowerCase())) &&
      (!appliedFilters.grnNo || row.grnNo == appliedFilters.grnNo) &&
      (!appliedFilters.poNo || row.poNo == appliedFilters.poNo) &&
      (!appliedFilters.department ||
        row.department
          .toLowerCase()
          .includes(appliedFilters.department.toLowerCase())) &&
      (!appliedFilters.itemName ||
        row.itemName
          .toLowerCase()
          .includes(appliedFilters.itemName.toLowerCase())) &&
      (!appliedFilters.paymentMode ||
        row.mode
          .toLowerCase()
          .includes(appliedFilters.paymentMode.toLowerCase()))
    );
  });

  const totals = filteredDataWithoutTotal.reduce(
    (acc, row) => ({
      total: acc.total + row.total,
      sgst: acc.sgst + row.sgst,
      cgst: acc.cgst + row.cgst,
      grandTotal: acc.grandTotal + row.grandTotal,
    }),
    { total: 0, sgst: 0, cgst: 0, grandTotal: 0 }
  );

  const totalsRow = {
    sno: "",
    userName: "",
    department: "",
    grnNo: "",
    poNo: "",
    date: "",
    time: "",
    suppName: "",
    invNo: "",
    total: totals.total.toFixed(2),
    sgst: totals.sgst.toFixed(2),
    cgst: totals.cgst.toFixed(2),
    round: "",
    grandTotal: totals.grandTotal.toFixed(2),
    mode: "",
    action: "",
    isTotalRow: true,
  };

  const filteredData = [...filteredDataWithoutTotal, totalsRow];

  const headers = [
    { label: "S.No", key: "sno" },
    { label: "User Name", key: "userName" },
    { label: "Dept", key: "department" },
    { label: "GRN No", key: "grnNo" },
    { label: "PO No", key: "poNo" },
    { label: "Date", key: "date" },
    { label: "Time", key: "time" },
    { label: "Supp Name", key: "suppName" },
    { label: "Inv No", key: "invNo" },
    { label: "Total", key: "total" },
    { label: "SGST", key: "sgst" },
    { label: "CGST", key: "cgst" },
    { label: "Round", key: "round" },
    { label: "Grand Total", key: "grandTotal" },
    { label: "Mode", key: "mode" },
  ];

  const handleDeleteRow = (row) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setData(data.filter((item) => item.sno !== row.sno));
    }
  };

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
    if (!row.isTotalRow) {
      setSelectedRowData(row);
      setIsModelOpen(true);
    }
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
            <div className="filter-form">
              <div className="filter-form-fields">
                <Form.Label>Date From</Form.Label>
                <Form.Control
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Date To</Form.Label>
                <Form.Control
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleInputChange}
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
                <Form.Label>Supp Name</Form.Label>
                <Form.Control
                  type="text"
                  name="suppName"
                  value={filters.suppName}
                  onChange={handleInputChange}
                  placeholder="Search Supplier Name"
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={filters.itemName}
                  onChange={handleInputChange}
                  placeholder="Search Item Name"
                />
              </div>
              <div className="filter-form-fields">
                <Form.Label>Payment Mode</Form.Label>
                <Form.Select
                  name="paymentMode"
                  value={filters.paymentMode}
                  onChange={handleInputChange}
                >
                  <option value="">--Select--</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                </Form.Select>
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
        <h3>GRN Report</h3>
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
                  data={filteredData}
                  headers={headers}
                  onClick={() => {
                    return confirm("Do you want to export the data?");
                  }}
                  filename={`${new Date()
                    .toISOString()
                    .slice(0, 10)}_GRN_Report.csv`}
                  className="csv-link"
                >
                  <FaFileCsv size={25} color="green" />
                </CSVLink>
              </div>
            </OverlayTrigger>
          </div>
          <button
            className="btn-create"
            onClick={() => {
              setShowFilter(!showFilter);
            }}
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

export default GRNReport;
