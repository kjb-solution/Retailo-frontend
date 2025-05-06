import React, { useState } from "react";
import {
  OverlayTrigger,
  Table,
  Tooltip,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import "./ItemWiseReport.css";
import { FaFileCsv, FaPrint } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { X } from "lucide-react";
const isMobile = window.innerWidth <= 768;

const salesData = [
  {
    category: "Tiffen Items",
    items: [
      { name: "Rava Upma", qty: 1, rate: 47.62 },
      { name: "Idli", qty: 6, rate: 14.28 },
      { name: "Plain Dosa", qty: 1, rate: 57.14 },
      { name: "Ghee Roast", qty: 7, rate: 104.76 },
    ],
  },
  {
    category: "Egg Items",
    items: [
      { name: "Onion Omelette", qty: 4, rate: 47.62 },
      { name: "Half Boil", qty: 1, rate: 19.05 },
      { name: "Omelette [single]", qty: 2, rate: 28.57 },
    ],
  },
  {
    category: "Chicken Items",
    items: [{ name: "Chicken 65 (boneless)", qty: 1, rate: 209.52 }],
  },
  {
    category: "Beverage Items",
    items: [
      { name: "Tea", qty: 3, rate: 19.05 },
      { name: "Coffee", qty: 13, rate: 28.57 },
    ],
  },
];

const ItemWiseReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sliderOpen, setSliderOpen] = useState(false);

  const handleItemSearch = () => {
    // Handle item search logic here
  };

  const handleCloseSlider = () => setSliderOpen(false);

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const tableContent = document.querySelector('.table-to-print').outerHTML;
    
    // Write the print-specific HTML to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Item Wise Sales Report</title>
          <style>
            @media print {
              body {
                margin: 20px;
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: center;
              }
              th {
                background-color: #f2f2f2;
                font-weight: bold;
              }
              .category-row td {
                background-color: #ffe6e6;
                color: red;
                font-weight: bold;
                text-align: left;
              }
              .total-row {
                background-color: #f2f2f2;
                font-weight: bold;
              }
              .text-end {
                text-align: right !important;
              }
              .text-center {
                text-align: center !important;
              }
            }
          </style>
        </head>
        <body>
          <h2>Item Wise Sales Report</h2>
          ${tableContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const csvHeaders = [
    { label: "S.No", key: "sno" },
    { label: "Category", key: "category" },
    { label: "Item Name", key: "name" },
    { label: "Quantity", key: "qty" },
    { label: "Rate", key: "rate" },
    { label: "Total", key: "total" },
  ];

  const generateCSVData = () => {
    let csvData = [];
    let sno = 1;

    salesData.forEach((group) => {
      group.items.forEach((item) => {
        csvData.push({
          sno: sno++,
          category: group.category,
          name: item.name,
          qty: item.qty,
          rate: item.rate.toFixed(2),
          total: (item.qty * item.rate).toFixed(2),
        });
      });
    });

    return csvData;
  };

  let grandTotal = 0;
  let itemCounter = 1;

  return (
    <div className="p-3 item-wise-report-table position-relative">
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
        <div className="utility-buttons-container d-flex gap-3">
          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={<Tooltip id="print-tooltip">Print Table</Tooltip>}
          >
            <FaPrint size={25} color="rgb(58, 89, 209)" onClick={handlePrint} style={{ cursor: "pointer" }} />
          </OverlayTrigger>

          <OverlayTrigger
            placement="top"
            delay={{ show: 100, hide: 100 }}
            overlay={<Tooltip id="csv-export-tooltip">Export CSV</Tooltip>}
          >
            <div>
              <CSVLink
                data={generateCSVData()}
                headers={csvHeaders}
                filename={`${new Date()
                  .toISOString()
                  .slice(0, 10)}_ItemWise_Sales_Report.csv`}
                className="csv-link"
                onClick={() => {
                  return confirm("Do you want to export the data?");
                }}
              >
                <FaFileCsv size={25} color="green" />
              </CSVLink>
            </div>
          </OverlayTrigger>
        </div>

        <button
          className="filter-btn"
          style={{ alignSelf: "center" }}
          onClick={() => setSliderOpen(!sliderOpen)}
        >
          <FaSearch /> Search
        </button>
      </div>

      {sliderOpen && (
        <div className="slider-overlay" onClick={handleCloseSlider}></div>
      )}

      <div
        className="slider-panel"
        style={{
          transform: sliderOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div className="filter-header">
          <h5>Search</h5>
          <X size={24} onClick={handleCloseSlider} className="close-icon" />
        </div>
        <hr />
        <Form className="p-3">
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="fromdate">
                <Form.Label>From Date</Form.Label>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="todate">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select>
                  <option value="">Select Category</option>
                  <option value="tiffen">Tiffen Items</option>
                  <option value="egg">Egg Items</option>
                  <option value="chicken">Chicken Items</option>
                  <option value="beverage">Beverage Items</option>
                </Form.Select>
              </Form.Group>
            </Col>
          
            <Col xs={12} style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
              <button className="theme-btn" onClick={handleItemSearch}>
                Apply Search
              </button>
            </Col>
          </Row>
        </Form>
      </div>

      <Table bordered hover responsive className="table-to-print">
        <thead className="table-secondary text-center">
          <tr>
            <th style={{ width: "5%" }}>S.No</th>
            <th>Category</th>
            <th style={{ width: "10%" }}>Qty</th>
            <th style={{ width: "10%" }}>Rate</th>
            <th style={{ width: "10%" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((group, groupIndex) => {
            let groupTotal = 0;

            return (
              <React.Fragment key={groupIndex}>
                <tr className="category-row">
                  <td colSpan={5} style={{ color: "red", fontWeight: "bold" }}>
                    {groupIndex + 1}. {group.category}
                  </td>
                </tr>
                {group.items.map((item, itemIndex) => {
                  const total = item.qty * item.rate;
                  grandTotal += total;
                  groupTotal += total;

                  return (
                    <tr key={itemIndex}>
                      <td className="text-center">{itemCounter++}</td>
                      <td>{item.name}</td>
                      <td className="text-center">{item.qty}</td>
                      <td className="text-end">{item.rate.toFixed(2)}</td>
                      <td className="text-end">{total.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
          <tr className="table-secondary fw-bold total-row">
            <td colSpan={4} className="text-end">
              Total
            </td>
            <td className="text-end">{grandTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ItemWiseReport;