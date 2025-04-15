import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./Invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCreditCard,
  faMoneyBillWave,
  faClock,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./cart";
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
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState(
    "Please add items to generate invoice"
  );

  useEffect(() => {
    if (showPrintView && totalItems === 0) {
      setShowPrintView(false);
    }
  }, [totalItems, showPrintView]);

  const handleGenerateInvoice = () => {
    if (totalItems === 0) {
      setNotificationMessage("Please add items to generate invoice");
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 2000);
      return;
    }

    setNotificationMessage("Generating POS invoice...");
    setNotification(true);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setShowPrintView(true);
      setNotification(false);
    }, 1000);
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
      width: isMobile ? "31%" : "30%",
      selector: (row) => row.name,
    },
    {
      name: "Rate",
      width: "20%",
      selector: (row) => row.price.toFixed(2),
    },
    {
      name: "Quantity",
      width: "21%",
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
      width: "18%",
      selector: (row) => (row.price * row.quantity).toFixed(2),
    },
    {
      name: "",
      width: "2%",
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
    <div className={`invoice-container ${showPrintView ? "print-mode" : ""}`}>
      {notification && (
        <div className="order-placed">{notificationMessage}</div>
      )}

      {showPopup && (
        <div className="popup-notification">Generating POS invoice...</div>
      )}

      {!showPrintView && !showPopup && (
        <>
          <div className="invoice-table">
            <DataTable
              className="invoice-items"
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
                    fontSize: isMobile ? "11px" : "12px",
                    overflowX: "hidden",
                  },
                },
                head: {
                  style: {
                    backgroundColor: "#000",
                    fontSize: "14px",
                    fontWeight: "bold",
                  },
                },
                headCells: {
                  style: {
                    fontSize: "15px",
                    fontWeight: "bold",
                    padding: "8px",
                  },
                },
                cells: {
                  style: {
                    padding: "8px",
                    wordBreak: "break-word",
                  },
                },
                table: {
                  style: {
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "black",
                    },
                    minWidth: "100%",
                    overflowX: "hidden",
                  },
                },
              }}
            />
          </div>
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
                <FontAwesomeIcon icon={faMoneyBillWave} /> Cash Payout
              </button>
            </div>
            <button className="place-order-btn" onClick={handleGenerateInvoice}>
              Generate Invoice
            </button>
          </div>
        </>
      )}

      {showPrintView && totalItems > 0 && (
        <div className="print-invoice">
          <h2 style={{ textAlign: "center" }}>POS INVOICE</h2>
          <p style={{ textAlign: "center", marginBottom: "8px" }}>
            <strong>QuickServe Solutions</strong>
            <br />
            123 Billing Lane, POS City
            <br />
            Phone: +91-9876543210 | GSTIN: 27ABCDE1234F1Z5
          </p>
          <hr />
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} @ ₹{item.price.toFixed(2)} - ₹
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <hr />
          <p>Sub Total: ₹{subtotal.toFixed(2)}</p>
          <p>Tax: ₹{tax.toFixed(2)}</p>
          <p>
            <strong>Total Payment: ₹{total.toFixed(2)}</strong>
          </p>
          <p>Payment Method: {selectedPayment}</p>

          <div className="button-row">
            <button className="print-btn" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} style={{ marginRight: "6px" }} />
              Print Invoice
            </button>
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Invoice;
