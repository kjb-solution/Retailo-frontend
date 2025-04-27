import React from "react";
import DataTable from "react-data-table-component";
function ReactDataTable({columns,items,isMobile}) {
  console.log("Inside react table",items);
  return (
    <>
      <DataTable
        columns={columns}
        data={items}
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="70vh"
        striped
        dense
        persistTableHead
        noDataComponent="No items in the cart"
        responsive
        customStyles={{
          rows: {
            style: {
              fontSize: isMobile ? "10px" : "12px",
              overflowX: "hidden",
            },
          },
          head: {
            style: {
              backgroundColor: "#000",
              fontSize: isMobile ? "5px" : "14px",
              fontWeight: "bold",
            },
          },
          headCells: {
            style: {
              fontSize: isMobile ? "12px" : "14px",
              fontWeight: "bold",
              padding: "8px",
            },
          },
          cells: {
            style: {
              fontSize: isMobile ? "10px" : "12px",
              padding: isMobile ? "8px" : "8px",
              wordBreak: "break-word",
            },
          },
          table: {
            style: {
              "&::-webkit-scrollbar": {},
              "&::-webkit-scrollbar-track": {
                background: "black",
              },
              minHeight: isMobile ? "60vh" : "70vh",
              overflowX: "hidden",
             
            },
          },
        }}
      />
    </>
  );
}

export default ReactDataTable;
