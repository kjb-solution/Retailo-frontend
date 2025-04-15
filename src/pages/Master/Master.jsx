import React, { useState } from "react";
import "./Master.css";
import DataTable from "react-data-table-component";
import { TrashSVG, EditSVG } from "../../assets/image";
import CreateItemForm from "./CreateItemForm";
import FilterItemForm from "./FilterItemForm";

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

const columns = [
  { name: "S.No", selector: (row) => row.sno },
  { name: "Group", selector: (row) => row.group, sortable: true },
  { name: "Category", selector: (row) => row.category, sortable: true },
  { name: "Code", selector: (row) => row.code },
  { name: "Item Name", selector: (row) => row.itemName },
  { name: "UOM", selector: (row) => row.uom },
  { name: "Rate", selector: (row) => row.rate },
  { name: "P.Rate", selector: (row) => row.pRate },
  {
    name: "Actions",
    cell: (row) => (
      <div className="d-flex gap-2">
        <button className="btn-edit">
          <EditSVG />
        </button>
        <button className="btn-dlt">
          <TrashSVG />
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

const fullData = [
  {
    sno: 1,
    group: "Restaurant",
    category: "KEBABS-6PCS",
    code: 1,
    itemName: "CHICKEN TAWA FRY",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
  {
    sno: 2,
    group: "Restaurant",
    category: "OMELETTES",
    code: 1,
    itemName: "CHICKEN OMELETTE",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
  {
    sno: 3,
    group: "Restaurant",
    category: "SPL KEBABS-6PCS",
    code: 1,
    itemName: "CHI TIKKA BARRA",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
  {
    sno: 4,
    group: "Restaurant",
    category: "KEBAB-ROLLS",
    code: 1,
    itemName: "EGG BHURJI ROLL -Large",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
  {
    sno: 5,
    group: "Restaurant",
    category: "KEBABS-6PCS",
    code: 1,
    itemName: "CHICKEN TAWA FRY",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
];

const MasterPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredData, setFilteredData] = useState(fullData);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleFilter = (filters) => {
    const filtered = fullData.filter((item) => {
      return (
        (!filters.masterGroup || item.group === filters.masterGroup) &&
        (!filters.category || item.category === filters.category) &&
        (!filters.itemName ||
          item.itemName.toLowerCase().includes(filters.itemName.toLowerCase()))
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Item Master</h3>
        <div className="d-flex gap-2">
          <button
            className="btn-filter"
            onClick={() => setShowFilterModal(true)}
          >
            Filter
          </button>
          <button className="btn-create" onClick={handleShow}>
            Create New
          </button>
        </div>
      </div>

      <div className="data-table-records">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
          // highlightOnHover
          customStyles={customStyles}
        />
      </div>
      <CreateItemForm show={showModal} handleClose={handleClose} />
      <FilterItemForm
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
        onFilter={handleFilter}
      />
    </div>
  );
};

export default MasterPage;
