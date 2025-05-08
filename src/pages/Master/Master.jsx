import React, { useState, useEffect } from "react";
import "./Master.css";
import DataTable from "react-data-table-component";
import { TrashSVG, EditSVG } from "../../assets/image";
import CreateItemForm from "./CreateItemForm";
import DeleteModal from "./DeleteModal";

const fullData = [
  {
    sno: 3,
    group: "Restaurant",
    category: "KEBABS-6PCS",
    code: 1,
    itemName: "CHICKEN TAWA FRY",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
  },
  {
    sno: 4,
    group: "Restaurant",
    category: "OMELETTES",
    code: 1,
    itemName: "CHICKEN OMELETTE",
    uom: "Nos",
    rate: 180.0,
    pRate: 0.0,
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

const MasterPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filteredData, setFilteredData] = useState(fullData);
  const [deleteItemSno, setDeleteItemSno] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("itemMasterData");
    if (storedData) {
      setFilteredData(JSON.parse(storedData));
    } else {
      setFilteredData(fullData);
      localStorage.setItem("itemMasterData", JSON.stringify(fullData));
    }
  }, []);

  const handleFormSubmit = (formData) => {
    let updatedData;

    if (editItem) {
      updatedData = filteredData.map((item) =>
        item.sno === editItem.sno ? { ...formData, sno: item.sno } : item
      );
    } else {
      updatedData = [
        ...filteredData,
        { ...formData, sno: filteredData.length + 1 },
      ];
    }

    setFilteredData(updatedData);
    localStorage.setItem("itemMasterData", JSON.stringify(updatedData));
    setEditItem(null);
    setShowModal(false);
  };

  const columns = [
    { name: "S.No", selector: (row) => row.sno },
    { name: "Group", selector: (row) => row.group },
    { name: "Category", selector: (row) => row.category },
    { name: "Code", selector: (row) => row.code },
    { name: "Item Name", selector: (row) => row.itemName },
    { name: "UOM", selector: (row) => row.uom },
    { name: "Rate", selector: (row) => row.rate },
    { name: "P.Rate", selector: (row) => row.pRate },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn-edit"
            onClick={() => {
              setEditItem(row);
              setShowModal(true);
            }}
          >
            <EditSVG />
          </button>
          <button
            className="btn-dlt"
            onClick={() => {
              setDeleteItemSno(row.sno);
              setShowDeleteModal(true);
            }}
          >
            <TrashSVG />
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (sno) => {
    const updated = filteredData.filter((item) => item.sno !== sno);
    setFilteredData(updated);
    localStorage.setItem("itemMasterData", JSON.stringify(updated));
  };

  const handleConfirmDelete = () => {
    const updated = filteredData.filter((item) => item.sno !== deleteItemSno);
    setFilteredData(updated);
    localStorage.setItem("itemMasterData", JSON.stringify(updated));
    setShowDeleteModal(false);
    setDeleteItemSno(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 class="slider-header">Item Master</h3>
        <div className="d-flex gap-2">
          <button
            className="btn-create"
            onClick={() => {
              setEditItem(null);
              setShowModal(true);
            }}
          >
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
          customStyles={customStyles}
        />
      </div>

      <CreateItemForm
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditItem(null);
        }}
        mode={editItem ? "edit" : "create"}
        initialValues={editItem}
        onSubmit={handleFormSubmit}
      />
      <DeleteModal
        show={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteItemSno(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MasterPage;
