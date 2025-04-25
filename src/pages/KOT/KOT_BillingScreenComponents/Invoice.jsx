import React, { useState, useEffect } from "react";

import "../../Billing/Invoice.css";
import "./KOT-invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListPlus, Printer, UserRoundPen } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCreditCard,
  faMoneyBillWave,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import InvoicePrintView from "./InvoicePrintView";
import ReactDataTable from "./ReactDataTable";
import { StaffSVG } from "../../../assets/image";
const isMobile = window.innerWidth < 768;

const Invoice = ({
  KOT_items,
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
  const [activeKotTab, setActiveKotTab] = useState("KOT");

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
      width: isMobile ? "100px" : "35%",

      selector: (row) => row.name,
    },
    {
      name: "Rate",
      width: isMobile ? "50px" : "15%",
      center: true,

      selector: (row) => row.price.toFixed(2),
    },
    {
      name: "Quantity",
      width: isMobile ? "70px" : "25%",
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
      width: isMobile ? "50px" : "15%",
      center: true,
      selector: (row) => (row.price * row.quantity).toFixed(2),
    },
    {
      name: "",
      width: isMobile ? "3px" : "5%",
      style: {
        display: "flex",
        justifyContent: "flex-start", // shift it slightly to the left
        paddingRight: "8px", // optional: control spacing from right edge
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
  console.log(KOT_items);

  const items = [
    { id: 31, name: "Coca Cola", price: 12.03, quantity: 1 },
    { id: 3, name: "Mango Juice", price: 10, quantity: 1 },
  ];

  return (
    <>
      <div className={`invoice-container ${showPrintView ? "print-mode" : ""}`}>
        {!showPrintView && !showPopup && (
          <>
            <div className="KOT-header-nav">
              <div className="KOT-Billing-header">
                <div
                  className={
                    activeKotTab === "KOT"
                      ? "active-kot-nav-header KOT-tab"
                      : "KOT-tab"
                  }
                  onClick={() => setActiveKotTab("KOT")}
                >
                  KOT
                </div>
                <div
                  className={
                    activeKotTab === "BILL"
                      ? "active-kot-nav-header KOT-tab"
                      : "KOT-tab"
                  }
                  onClick={() => setActiveKotTab("BILL")}
                >
                  BILL
                </div>
                <div className="KOT-staff-tab">
                  <StaffSVG />
                  <Form.Select className="kot-staff-select">
                    <option>Select Staff</option>
                    <option value="Staff1">Staff1</option>
                    <option value="Staff2">Staff2</option>
                    <option value="Staff3">Staff3</option>
                  </Form.Select>
                </div>
              </div>
              {activeKotTab === "KOT" && (
                <div className="KOT-table-container">
                  <ReactDataTable
                    items={KOT_items}
                    columns={columns}
                    isMobile={isMobile}
                   
                  />
                  <div className="KOT-create-btn-container"><button className="KOT-create-btn">   <ListPlus /> Create KOT </button></div>
                </div>
              )}

              {activeKotTab === "BILL" && (
                <>
                  <ReactDataTable
                    items={items}
                    columns={columns}
                    isMobile={isMobile}
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
                  <button
                    className="place-order-btn"
                    onClick={handleGenerateInvoice}
                  >
                    <Printer /> Place Order
                  </button>
                </>
              )}
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
  );
};
export default Invoice;
