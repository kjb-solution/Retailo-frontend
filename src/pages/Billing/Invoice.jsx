import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./Invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCreditCard,
  faMoneyBillWave,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import InvoicePrintView from "./InvoicePrintView";
const isMobile = window.innerWidth < 768;

const Invoice = ({
  items,
  subtotal,
  tax,
  total,
  onUpdateQty,
  onDelete,
  totalItems,
  onClearCart,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("UPI");


  useEffect(() => {
    if (showPrintView && totalItems === 0) {
      setShowPrintView(false);
    }
  }, [totalItems, showPrintView]);

  const handleGenerateInvoice = () => {
    if (totalItems === 0) {
      toast.error("Please add items to generate invoice");
      return;
    }
  

    setShowPopup(true);
  
    setTimeout(() => {
      setShowPopup(false);
      setShowPrintView(true);
    }, 100);
  };
  
  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
    onClearCart();
  };

  const columns = [
    {
      name: "Name",
      width:isMobile ? "100px" : "35%",
     
      selector: (row) => row.name,
    },
    {
      name: "Rate",
      width:isMobile ? "50px" : "15%",
      center: true,
     
      selector: (row) => row.price.toFixed(2),
    },
    {
      name: "Quantity",
      width:isMobile ? "70px" : "25%",
      cell: (row) => (
        <div className="quantity-controller">
          <FontAwesomeIcon
            icon={faMinus}
            className="quantity-icons"
            onClick={() => onUpdateQty(row.id, -1)}
          />
          <div>{row.quantity}</div>
          <FontAwesomeIcon
            icon={faPlus}
            className="quantity-icons"
            onClick={() => onUpdateQty(row.id, 1)}
          />
        </div>
      ),
    },
    {
      name: "Total",
      width:isMobile ? "50px" : "15%",
      center: true,
      selector: (row) => (row.price * row.quantity).toFixed(2),
    },
    {
      name: "",
      width:isMobile ? "3px" : "5%",
      style: {
        display: "flex",
        justifyContent: "flex-start", // shift it slightly to the left
        paddingRight: "8px",          // optional: control spacing from right edge
      },
      cell: (row) => (
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          className="delete-icon"
          onClick={() => onDelete(row.id)}
        />
      ),
    },
  ];
  
  return (
    <>
    <div className={`invoice-container ${showPrintView ? "print-mode" : ""}`}>
     
   
      {!showPrintView && !showPopup && (
        <>
        
            <DataTable
              columns={columns}
              data={items}
              highlightOnHover
              fixedHeader
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
                    padding: isMobile ? "8px" : "10px",
                    wordBreak: "break-word",
                  },
                },
                table: {
                  style: {
                    "&::-webkit-scrollbar": {
                     
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "black",
                    },
                  
                    overflowX: "hidden",
                  },
                },
              }}
            />
         
          <div className="invoice-footer">
            <div className="invoice-summary">
              <div className="summary-row">
                <span>Sub Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total Payment</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="payment-methods">
              <button
                className={`payment-button ${
                  selectedPayment === "Credit Card" ? "active" : ""
                }`}
                onClick={() => setSelectedPayment("Credit Card")}
              >
                <FontAwesomeIcon icon={faCreditCard} /> Credit Card
              </button>
              <button
                className={`payment-button ${
                  selectedPayment === "UPI" ? "active" : ""
                }`}
                onClick={() => setSelectedPayment("UPI")}
              >
                <FontAwesomeIcon icon={faClock} /> UPI
              </button>
              <button
                className={`payment-button ${
                  selectedPayment === "Cash Payout" ? "active" : ""
                }`}
                onClick={() => setSelectedPayment("Cash Payout")}
              >
                <FontAwesomeIcon icon={faMoneyBillWave} /> Cash
              </button>
            </div>
            <button className="place-order-btn" onClick={handleGenerateInvoice}>
            <Printer /> Place Order
            </button>
          </div>
        </>
      )}

      {showPrintView && totalItems > 0 && (
       <InvoicePrintView
         items={items}
         subtotal={subtotal}
         tax={tax}
         total={total}
         selectedPayment={selectedPayment}
         handleBack={handleBack}
       />
      )}

    </div>
     
    </>
  );};
export default Invoice;
