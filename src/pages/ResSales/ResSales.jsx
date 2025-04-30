import { FilePenLine, Printer, Filter, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./ResSales.css";

function ResSales() {
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    billStatus: "",
    stName: "",
    billNo: "",
    roomNo: "",
    tableNo: "",
    billType: "",
    pMode: "",
    entityName: "",
    postFrom: "",
    department: "",
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const columns = [
    { name: "S.No", center: true, selector: (row) => row.sno },
    { name: "Date&Time", selector: (row) => row.billDate },
    { name: "RM No", center: true, selector: (row) => row.rmNo },
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
      selector: (row) => row.billStatus,
    },
    {
      name: "Action",
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

  const allData = [
    {
      sno: 1,
      billDate: "24/04/2025 7:47 am",
      rmNo: 0,
      guestName: "Alphonse Irudaya Sakayaraj",
      billNo: "RF/281",
      tableNumber: "T1",
      kotNo: 2581,
      nop: 0,
      netTot: "57.14",
      disc: "0.00",
      stateGST: "1.43",
      centralGST: "1.43",
      salesTax: "0.00",
      charge: "0.00",
      grandTot: "60.00",
      payMode: "Room #3",
      billAmount: "₹60.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
      roomNo: "3",
      billType: "RF", // Assuming based on billNo prefix
      entityName: "Alphonse Irudaya Sakayaraj", // Assuming guestName as entityName
      postFrom: "Food", // Assuming based on context
      department: "Food", // Assuming based on context
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
      netTot: "51.43",
      disc: "0.00",
      stateGST: "1.43",
      centralGST: "1.43",
      salesTax: "0.00",
      charge: "0.57",
      grandTot: "55.00",
      payMode: "Room #20",
      billAmount: "₹55.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
      roomNo: "20",
      billType: "RSF",
      entityName: "Karthis Sundaram",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 3,
      billDate: "24/04/2025 8:11 am",
      rmNo: 2,
      guestName: "Arun Kumar",
      billNo: "RSF/063",
      tableNumber: "T2",
      kotNo: 2562,
      nop: 0,
      netTot: "51.43",
      disc: "0.00",
      stateGST: "1.43",
      centralGST: "1.43",
      salesTax: "0.00",
      charge: "0.57",
      grandTot: "55.00",
      payMode: "Room #2",
      billAmount: "₹55.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
      roomNo: "2",
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
      netTot: "51.43",
      disc: "0.00",
      stateGST: "1.43",
      centralGST: "1.43",
      salesTax: "0.00",
      charge: "0.57",
      grandTot: "55.00",
      payMode: "Room #9",
      billAmount: "₹55.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
      roomNo: "9",
      billType: "RSF",
      entityName: "Rajasear Senthurai",
      postFrom: "Food",
      department: "Food",
    },
    {
      sno: 5,
      billDate: "24/04/2025 10:04 am",
      rmNo: 9,
      guestName: "Rajasear Senthurai",
      billNo: "RSF/096",
      tableNumber: "T2",
      kotNo: 2565,
      nop: 0,
      netTot: "51.43",
      disc: "0.00",
      stateGST: "1.43",
      centralGST: "1.43",
      salesTax: "0.00",
      charge: "0.00",
      grandTot: "55.00",
      payMode: "Room #2",
      billAmount: "₹55.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
      roomNo: "2",
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
      netTot: "295.24",
      disc: "0.00",
      stateGST: "5.24",
      centralGST: "5.24",
      salesTax: "0.00",
      charge: "31.45",
      grandTot: "331.73",
      payMode: "Room #3",
      billAmount: "₹331.73",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
      roomNo: "3",
      billType: "RSF",
      entityName: "Rajasear Senthurai",
      postFrom: "Food",
      department: "Food",
    },
  ];

  function actionIcons() {
    return (
      <span className="action-icons">
        <FilePenLine size={16} color="green" />
        <Printer size={16} color="#3A59D1" />
      </span>
    );
  }

  const filteredData = allData.filter((row) => {
    const billDate = new Date(row.billDate);
    const fromDate = appliedFilters.fromDate
      ? new Date(appliedFilters.fromDate)
      : null;
    const toDate = appliedFilters.toDate
      ? new Date(appliedFilters.toDate)
      : null;

    return (
      (!appliedFilters.fromDate || billDate >= fromDate) &&
      (!appliedFilters.toDate || billDate <= toDate) &&
      (!appliedFilters.billStatus ||
        row.status.toLowerCase() === appliedFilters.billStatus.toLowerCase()) &&
      (!appliedFilters.stName ||
        row.guestName
          .toLowerCase()
          .includes(appliedFilters.stName.toLowerCase())) &&
      (!appliedFilters.billNo ||
        row.billNo
          .toLowerCase()
          .includes(appliedFilters.billNo.toLowerCase())) &&
      (!appliedFilters.roomNo ||
        row.roomNo
          .toLowerCase()
          .includes(appliedFilters.roomNo.toLowerCase())) &&
      (!appliedFilters.tableNo ||
        row.tableNumber
          .toLowerCase()
          .includes(appliedFilters.tableNo.toLowerCase())) &&
      (!appliedFilters.billType ||
        row.billType.toLowerCase() === appliedFilters.billType.toLowerCase()) &&
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
          <div className="filter-content">
            <div className="filter-header">
              <h5>Filters</h5>
              <X
                size={24}
                onClick={() => setShowFilter(false)}
                className="close-icon"
              />
            </div>
            <hr />
            <div className="filter-form">
              <div className="filter-form-fields">
                <label>From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="filter-form-fields">
                <label>To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="filter-form-fields">
                <label>Bill No</label>
                <input
                  type="text"
                  name="billNo"
                  value={filters.billNo}
                  onChange={handleInputChange}
                  placeholder="Search Bill No"
                />
              </div>
              <div className="filter-form-fields">
                <label>Room No</label>
                <input
                  type="text"
                  name="roomNo"
                  value={filters.roomNo}
                  onChange={handleInputChange}
                  placeholder="Search Room No"
                />
              </div>
              <div className="filter-form-fields">
                <label>Table No</label>
                <input
                  type="text"
                  name="tableNo"
                  value={filters.tableNo}
                  onChange={handleInputChange}
                  placeholder="Search Table No"
                />
              </div>
              <div className="filter-form-fields">
                <label>Bill Type</label>
                <select
                  name="billType"
                  value={filters.billType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Bill Type</option>
                  <option value="RF">RF</option>
                  <option value="RSF">RSF</option>
                </select>
              </div>
              <div className="filter-form-fields">
                <label>Pay Mode</label>
                <input
                  type="text"
                  name="pMode"
                  value={filters.pMode}
                  onChange={handleInputChange}
                  placeholder="Search Pay Mode"
                />
              </div>
              <div className="filter-form-fields">
                <label>Entity Name</label>
                <input
                  type="text"
                  name="entityName"
                  value={filters.entityName}
                  onChange={handleInputChange}
                  placeholder="Search Entity Name"
                />
              </div>
              <div className="filter-form-fields">
                <label>Post From</label>
                <input
                  type="text"
                  name="postFrom"
                  value={filters.postFrom}
                  onChange={handleInputChange}
                  placeholder="Search Post From"
                />
              </div>
              <div className="filter-form-fields">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={filters.department}
                  onChange={handleInputChange}
                  placeholder="Search Department"
                />
              </div>
              <div className="filter-form-fields">
                <label>Bill Status</label>
                <select
                  name="billStatus"
                  value={filters.billStatus}
                  onChange={handleInputChange}
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
              <div className="filter-form-fields">
                <label>ST Name</label>
                <input
                  type="text"
                  name="stName"
                  value={filters.stName}
                  onChange={handleInputChange}
                  placeholder="Search ST Name"
                />
              </div>
              <div className="filter-buttons">
                <button className="apply-btn" onClick={handleApplyFilter}>
                  Apply Filter
                </button>
              </div>
            </div>{" "}
          </div>
        )}
      </div>

      <div className="top-header">
        <h3>Restaurant Sales</h3>
        <button
          className="filter-btn"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>
      <div className="data-table-records">
        <DataTable
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          fixedHeader
          fixedHeaderScrollHeight="70vh"
          paginationPerPage={10}
          customStyles={customStyles}
        />
      </div>
      <div style={{ display: "flex" ,width:"100%",justifyContent:"space-between",gap:"10px",backgroundColor:"#fff"}}>
       <div style={{width:"50%",border:"1px solid #ccc",padding:"10px"}}>
       <h5>Restaurant Sales Details</h5>
        <div className="res-sales-details" >
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
              <div style={{width:"49%"}}>{label}</div>
              <span>:</span>
              <div style={{width:"49%",textAlign:"right"}}>{value}</div>
            </div>
          ))}
        </div>
       </div>
       <div style={{width:"50%",border:"1px solid #ccc",padding:"10px"}}>
       <h5> Sales Details</h5>
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
            <div style={{width:"49%"}}>{label}</div>
              <span>:</span>
              <div style={{width:"49%",textAlign:"right"}}>{value}</div>
            </div>
          ))}
        </div>
       </div>
      </div>
    </div>
  );
}

export default ResSales;
