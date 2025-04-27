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
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const columns = [
    { name: "S.No", width: "100px", selector: (row) => row.sno },
    { name: "Table No", width: "100px", selector: (row) => row.tableNumber },
    { name: "Customer Name", selector: (row) => row.customerName },
    { name: "ST Name", selector: (row) => row.stName },
    { name: "Dept Name", selector: (row) => row.deptName },
    { name: "Bill No", selector: (row) => row.billNo },
    { name: "Bill Date", selector: (row) => row.billDate },
    { name: "Bill Amo", selector: (row) => row.billAmount },
    {
      name: "Bill Status",
      width: "100px",
      center: true,
      selector: (row) => row.billStatus,
    },
    {
      name: "Action",
      width: "100px",
      center: true,
      selector: (row) => row.action,
    },
  ];

  const allData = [
    {
      sno: 1,
      tableNumber: "1",
      customerName: "John Doe",
      stName: "John",
      deptName: "Food",
      billNo: "12345",
      billDate: "2023-08-01",
      billAmount: "₹100.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
    },
    {
      sno: 2,
      tableNumber: "2",
      customerName: "Jane Smith",
      stName: "Jane",
      deptName: "Drinks",
      billNo: "67890",
      billDate: "2023-08-02",
      billAmount: "₹200.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
    },
    {
      sno: 3,
      tableNumber: "3",
      customerName: "Michael Johnson",
      stName: "Michael",
      deptName: "Food",
      billNo: "54321",
      billDate: "2023-08-05",
      billAmount: "₹150.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
    },
    {
      sno: 4,
      tableNumber: "4",
      customerName: "Emily Williams",
      stName: "Emily",
      deptName: "Bar",
      billNo: "98765",
      billDate: "2023-08-07",
      billAmount: "₹300.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
    },
    {
      sno: 5,
      tableNumber: "5",
      customerName: "Chris Brown",
      stName: "Chris",
      deptName: "Food",
      billNo: "11223",
      billDate: "2023-08-10",
      billAmount: "₹250.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
    },
    {
      sno: 6,
      tableNumber: "6",
      customerName: "Olivia Davis",
      stName: "Olivia",
      deptName: "Cafe",
      billNo: "33445",
      billDate: "2023-08-12",
      billAmount: "₹400.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
    },
    {
      sno: 7,
      tableNumber: "7",
      customerName: "Liam Wilson",
      stName: "Liam",
      deptName: "Food",
      billNo: "55667",
      billDate: "2023-08-14",
      billAmount: "₹500.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
    },
    {
      sno: 8,
      tableNumber: "8",
      customerName: "Sophia Martinez",
      stName: "Sophia",
      deptName: "Cafe",
      billNo: "77889",
      billDate: "2023-08-16",
      billAmount: "₹600.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
    },
    {
      sno: 9,
      tableNumber: "9",
      customerName: "James Anderson",
      stName: "James",
      deptName: "Food",
      billNo: "99100",
      billDate: "2023-08-18",
      billAmount: "₹350.00",
      billStatus: <div className="paid-status">Paid</div>,
      action: actionIcons(),
      status: "Paid",
    },
    {
      sno: 10,
      tableNumber: "10",
      customerName: "Ava Thomas",
      stName: "Ava",
      deptName: "Bar",
      billNo: "10112",
      billDate: "2023-08-20",
      billAmount: "₹450.00",
      billStatus: <div className="unpaid-status">Unpaid</div>,
      action: actionIcons(),
      status: "Unpaid",
    },
  ];

  function actionIcons() {
    return (
      <span className="action-icons">
        <FilePenLine size={16} color="green" />
        <Printer size={16} color="blue" />
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
        row.stName.toLowerCase().includes(appliedFilters.stName.toLowerCase()))
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
      <div
        className={`filter-panel ${showFilter ? "show" : ""}`}
        ref={filterRef}
      >
        {showFilter && (
          <div className="filter-content">
            <div className="filter-header">
              <h2>Filters</h2>
              <X
                size={24}
                onClick={() => setShowFilter(false)}
                className="close-icon"
              />
            </div>
            <hr />
            <div className="filter-form">
              <label>From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleInputChange}
              />
              <label>To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleInputChange}
              />
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
              <label>ST Name</label>
              <input
                type="text"
                name="stName"
                value={filters.stName}
                onChange={handleInputChange}
                placeholder="Search ST Name"
              />
              <div className="filter-buttons">
                <button className="apply-btn" onClick={handleApplyFilter}>
                  Apply Filter
                </button>
                <button
                  className="clear-btn"
                  onClick={() => {
                    setFilters({
                      fromDate: "",
                      toDate: "",
                      billStatus: "",
                      stName: "",
                    });
                    setAppliedFilters({
                      fromDate: "",
                      toDate: "",
                      billStatus: "",
                      stName: "",
                    });
                    setShowFilter(false);
                  }}
                >
                  Clear Filter
                </button>
              </div>
            </div>
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

      <DataTable
        columns={columns}
        data={filteredData}
        striped
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        dense
        paginationPerPage={10}
        customStyles={{
          rows: { style: { fontSize: "12px", overflowX: "hidden" } },
          headCells: {
            style: {
              backgroundColor: "#233250",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          cells: { style: { fontSize: "15px",paddingTop:"15px", paddingLeft: "15px" } },
          table: {
            style: {
              minHeight: "100%",
              maxHeight: "500px",
              overflowX: "hidden",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            },
          },
        }}
      />
    </div>
  );
}

export default ResSales;
