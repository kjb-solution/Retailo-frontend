import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./Invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrinterLoading from "../../assets/PrinterLoading.webm";

import {
  faPlus,
  faMinus,
  faTrashAlt,
  faCreditCard,
  faMoneyBillWave,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import InvoicePrintView from "./InvoicePrintView";
import { printReceipt } from "../../services/NodePrinter";

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
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeMoreBillingOptions, setActiveMoreBillingOptions] =
    useState(false);
  const [guestDetails, setGuestDetails] = useState({
    pin1: "001",
    pin2: "001",
    selectedOption: "Discount",
  });

  useEffect(() => {
    if (showPrintView && totalItems === 0) {
      setShowPrintView(false);
    }
  }, [totalItems, showPrintView]);

  const handleGenerateInvoice = async () => {
    if (totalItems === 0) {
      toast.error("Please add items to generate invoice");
      return;
    }
    setIsPrinting(true);

    const data = {
      billNumber: "BF-1332,BL-1397",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      tableNo: "G2",
      captain: "Gp.Day",
      items,
      subtotal,
      cgst: tax.toFixed(2),
      sgst: tax.toFixed(2),
      vat: 0,
      total,
      selectedPayment,
      gstNumber: "4910487129047124",
      companyName: "GREEN GARDEN RESORT",
    };
    const response = await printReceipt(data);
    console.log(response);
    response.success && setIsPrinting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
    onClearCart();
  };

  const handleGuestDetailsSubmit = () => {
    const dataToSend = {
      pin: `${guestDetails.pin1}-${guestDetails.pin2}`,
      selectedOption: guestDetails.selectedOption || "None",
    };
    console.log("Data to Send:", dataToSend);
    setActiveMoreBillingOptions(false);
  };

  const handleGuestDetailsChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (option) => {
    setGuestDetails((prev) => ({ ...prev, selectedOption: option }));
  };

  const columns = [
    {
      name: "Name",
      width: isMobile ? "45%" : "35%",
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
        justifyContent: "flex-start",
        paddingRight: "8px",
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

  const handleMoreClick = () => {
    setActiveMoreBillingOptions(true);
  };

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
                    "&::-webkit-scrollbar": {},
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
                  <span>CGST/SGST</span>
                  <span>
                    <span>₹{tax.toFixed(2) + "/"}</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </span>
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  className="place-order-btn"
                  style={{
                    transition: "all 0.3s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={handleGenerateInvoice}
                >
                  <Printer />
                  <span>{isPrinting ? "Saving" : "Save"}</span>
                  {isPrinting ? (
                    <div
                      style={{
                        width: "35px",
                        height: "20px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        paddingLeft: "1px",
                      }}
                    >
                      <video
                        src={PrinterLoading}
                        autoPlay
                        loop
                        muted
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: "scale(3.5)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </button>
                <button className="more-btn" onClick={handleMoreClick}>
                  More
                </button>
              </div>
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

      {activeMoreBillingOptions && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          <style>
            {`
              @keyframes slideInFromRight {
                0% {
                  transform: translateX(100%);
                  opacity: 0;
                }
                100% {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes slideOutToRight {
                0% {
                  transform: translateX(0);
                  opacity: 1;
                }
                100% {
                  transform: translateX(100%);
                  opacity: 0;
                }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              .slider-panel {
                animation: ${
                  activeMoreBillingOptions
                    ? "slideInFromRight"
                    : "slideOutToRight"
                } 0.3s ease-in-out forwards;
              }
            `}
          </style>
          <div
            className="slider-panel"
            style={{
              backgroundColor: "white",
              padding: isMobile ? "15px" : "20px",
              borderRadius: "8px 0 0 8px",
              width: isMobile ? "100%" : "400px",
              height: "100%",
              position: "relative",
              boxShadow: "-2px 0 5px rgba(0,0,0,0.2)",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3
                style={{
                  marginBottom: "15px",
                  fontSize: isMobile ? "30px" : "24px",
                }}
              >
                Guest Details
              </h3>
              <hr />
              <button
                onClick={() => setActiveMoreBillingOptions(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <div
              className="guest-details-actions"
              style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
            >
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    guestDetails.selectedOption === "NC"
                      ? "#405172"
                      : "#9AA6B2",
                  color:
                    guestDetails.selectedOption === "NC"
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handleOptionSelect("NC")}
              >
                NC
              </button>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    guestDetails.selectedOption === "Discount"
                      ? "#405172"
                      : "#9AA6B2",
                  color:
                    guestDetails.selectedOption === "Discount"
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handleOptionSelect("Discount")}
              >
                Discount
              </button>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    guestDetails.selectedOption === "Split"
                      ? "#405172"
                      : "#9AA6B2",
                  color:
                    guestDetails.selectedOption === "Split"
                      ? "#fff"
                      : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handleOptionSelect("Split")}
              >
                Split
              </button>
            </div>

            <div className="guest-details-form">
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    width: "60px",
                  }}
                >
                  PIN
                </label>
                  
                  <input
                    type="text"
                    name="pin1"
                    value={guestDetails.pin1}
                    onChange={handleGuestDetailsChange}
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "80px",
                    }}
                  />
                </div>
                   <div style={{ display: "flex", flexDirection: "column" }}>
                   <label
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    width: "60px",
                  }}
                >
                  Details
                </label>
                  <input
                    type="text"
                    name="pin2"
                    value={guestDetails.pin2}
                    onChange={handleGuestDetailsChange}
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "100%",
                    }}
                  />
                   </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={handleGuestDetailsSubmit}
                  className="theme-btn"
                  style={{
                    padding: "10px 40px",
                    width: "50%",
                    cursor: "pointer",
                  }}
                >
                  Apply
                </button>
                <button
                  onClick={() => setActiveMoreBillingOptions(false)}
                  className="theme-exit-btn"
                >
                 Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
