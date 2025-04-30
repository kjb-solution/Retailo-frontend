import React from 'react'
import DataTable from 'react-data-table-component'


function KOT_BookedView() {
    const columns =[
        {
            name:"TN",
            selector: (row) => row.TN,

        },
        {
            name:"BN",
            selector: (row) => row.BN,
        },
        {
            name:"AMT",
            selector: (row) => row.AMT,
        }
    ]
    const data =[
        {
            TN: "B6",
            BN: "BL/1254",
            AMT: "₹650.00",
        },
        {
            TN: "B5",
            BN: "BL/1251",
            AMT: "₹650.00",
        },
        {
            TN: "B6",
            BN: "BL/1250",
            AMT: "₹650.00",
        },
    ]
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
    <div style={{backgroundColor:"white",padding:"2px",height:"100%",boxShadow:"0 0 10px rgba(0, 0, 0, 0.1)",borderRadius:"5px"}}>
        
        <DataTable
        columns={columns}
        data={data}
        striped
        highlightOnHover
        fixedHeader
        customStyles={customStyles}
        />

    </div>
  )
}

export default KOT_BookedView