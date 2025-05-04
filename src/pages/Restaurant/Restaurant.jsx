import React, { useState } from "react";
import DataTable from "react-data-table-component";
import FilterReportsData from "./FilterReportsData";

const Restaurant = () => {
  const initialData = [
    {
      fromDate: "2024-04-21",
      toDate: "2024-04-21",
      billNo: "B001",
      kotNo: "K1001",
      netTot: "450.00",
      sgst: "22.50",
      cgst: "22.50",
      grandTot: "495.00",
      paymentMode: "Cash",
    },
    {
      fromDate: "2024-04-22",
      toDate: "2024-04-22",
      billNo: "B002",
      kotNo: "K1002",
      netTot: "600.00",
      sgst: "30.00",
      cgst: "30.00",
      grandTot: "660.00",
      paymentMode: "Card",
    },
  ];

  const [showFilter, setShowFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilter = (filterValues) => {
    const { fromDate, toDate } = filterValues;

    if (fromDate && toDate) {
      const result = initialData.filter((item) => {
        const itemDate = new Date(item.fromDate);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      });
      setFilteredData(result);
    } else {
      setFilteredData(initialData);
    }

    setShowFilter(false);
  };

  const columns = [
    { name: "S.No", selector: (row, i) => i + 1 },
    { name: "From Date", selector: (row) => row.fromDate, sortable: true },
    { name: "To Date", selector: (row) => row.toDate, sortable: true },
    { name: "Bill No", selector: (row) => row.billNo },
    { name: "Kot No", selector: (row) => row.kotNo },
    { name: "Net Tot", selector: (row) => row.netTot },
    { name: "SGST", selector: (row) => row.sgst },
    { name: "CGST", selector: (row) => row.cgst },
    { name: "Grand Tot", selector: (row) => row.grandTot },
    { name: "P.Mode", selector: (row) => row.paymentMode },
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

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Report</h3>
        <button className="btn-create" onClick={() => setShowFilter(true)}>
          Filter
        </button>
      </div>

      <div className="data-table-records">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          customStyles={customStyles}
        />
      </div>

      <FilterReportsData
        show={showFilter}
        handleClose={() => setShowFilter(false)}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default Restaurant;
