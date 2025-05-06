import React, { useState, useEffect } from "react";

import "../../Billing/Invoice.css";
import "./KOT-invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListPlus,
  Printer,
  ReceiptText,
  UserRoundPen,
  UtensilsCrossed,
} from "lucide-react";
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
import { printReceipt } from "../../../services/NodePrinter";
import PrinterLoading from "../../../assets/PrinterLoading.webm";

const Invoice = ({
  KOT_items,
  kOTBillingProducts,
  kOTUpdateQuantity,
  kOTDeleteProduct,
  subtotal,
  tax,
  total,
  updateQuantity,
  deleteProduct,
  totalItems,
  onClearCart,
  handleKOTCreate,
  kotTotalItems,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("UPI");
  const [activeKotTab, setActiveKotTab] = useState("KOT");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeMoreBillingOptions, setActiveMoreBillingOptions] =
    useState(false);

  const initialGuestDetails = {
    pin1: "001",
    pin2: "001",
    selectedOption: null,
    discount: 0,
    nc: 0,
  };
  const [guestDetails, setGuestDetails] = useState(initialGuestDetails);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showPrintView && totalItems === 0) {
      setShowPrintView(false);
    }
  }, [totalItems, showPrintView]);

  const handleGenerateInvoice = async () => {
    console.log(kOTBillingProducts);

    if (kotTotalItems === 0) {
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
      items: kOTBillingProducts,
      subtotal,
      cgst: tax.toFixed(2),
      sgst: tax.toFixed(2),
      vat: 0,
      total,
      selectedPayment,
      gstNumber: "4910487129047124",
      companyName: "GREEN GARDEN RESORT",
    };
    console.log(data);

    const response = await printReceipt(data);
    // console.log(response);
    response.success && setIsPrinting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    setShowPrintView(false);
    onClearCart();
  };
  // console.log("Invoice", KOT_items);
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
            onClick={() => kOTUpdateQuantity(row.id, -1)}
          />
          <div>{row.quantity}</div>
          <FontAwesomeIcon
            icon={faPlus}
            className="quantity-icons"
            onClick={() => kOTUpdateQuantity(row.id, 1)}
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
          onClick={() => kOTDeleteProduct(row.id)}
        />
      ),
    },
  ];
  const kot_columns = [
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
            onClick={() => updateQuantity(row.id, -1)}
          />
          <div>{row.quantity}</div>
          <FontAwesomeIcon
            icon={faPlus}
            className="quantity-icons"
            onClick={() => updateQuantity(row.id, 1)}
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
          onClick={() => deleteProduct(row.id)}
        />
      ),
    },
  ];
  const handleGuestDetailsSubmit = () => {
    console.log("Guest Details:", guestDetails);
    const dataToSend = {
      pin: `${guestDetails.pin1}-${guestDetails.pin2}`,
      selectedOption: guestDetails.selectedOption || "None",
    };
    console.log("Data to Send:", dataToSend);
    setActiveMoreBillingOptions(false);
    setGuestDetails(initialGuestDetails);
  };

  const handleGuestDetailsChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionSelect = (option) => {
    setGuestDetails((prev) => ({ ...prev, selectedOption: option }));
  };

  const handleMoreClick = () => {
    setActiveMoreBillingOptions(true);
  };

  return (
    <>
      <div className={`invoice-container ${showPrintView ? "print-mode" : ""}`}>
        {!showPrintView && !showPopup && (
          <>
            <div className="KOT-header-nav">
              <div className="KOT-Billing-header">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1px",
                    width: "140%",
                  }}
                >
                  <div
                    className={
                      activeKotTab === "KOT"
                        ? "active-kot-nav-header KOT-tab"
                        : "KOT-tab"
                    }
                    onClick={() => setActiveKotTab("KOT")}
                  >
                    <UtensilsCrossed size={15} />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      KOT{" "}
                      <span className="kot-cart-quantity">{totalItems}</span>
                    </span>
                  </div>
                  <div
                    className={
                      activeKotTab === "BILL"
                        ? "active-kot-nav-header KOT-tab"
                        : "KOT-tab"
                    }
                    onClick={() => setActiveKotTab("BILL")}
                  >
                    <ReceiptText size={15} />
                    BILL
                  </div>
                </div>
                <div
                  className="KOT-staff-tab"
                  style={{
                    border: "1px solid var(--theme-menu-bg-color)",
                    color: "var(--theme-menu-bg-color)",
                  }}
                >
                  <StaffSVG />
                  <Form.Select
                    className="kot-staff-select user-form-select"
                    style={{
                      backgroundColor: "var(--theme-menu-bg-color)",
                      color: "#000",
                      border: "none",
                    }}
                  >
                    <option
                      style={{
                        backgroundColor: "var(--theme-menu-bg-color)",
                        color: "#000",
                      }}
                    >
                      Select Staff
                    </option>
                    <option
                      value="Staff1"
                      style={{
                        backgroundColor: "var(--theme-menu-bg-color)",
                        color: "#000",
                      }}
                    >
                      Staff1
                    </option>
                    <option
                      value="Staff2"
                      style={{
                        backgroundColor: "var(--theme-menu-bg-color)",
                        color: "#000",
                      }}
                    >
                      Staff2
                    </option>
                    <option
                      value="Staff3"
                      style={{
                        backgroundColor: "var(--theme-menu-bg-color)",
                        color: "#000",
                      }}
                    >
                      Staff3
                    </option>
                  </Form.Select>
                </div>
              </div>
              {activeKotTab === "KOT" && (
                <div className="KOT-table-container">
                  <ReactDataTable
                    items={KOT_items}
                    columns={kot_columns}
                    isMobile={isMobile}
                  />
                  <div className="KOT-create-btn-container">
                    <button
                      onClick={handleKOTCreate}
                      className="KOT-create-btn"
                    >
                      {" "}
                      <ListPlus /> Create KOT{" "}
                    </button>
                  </div>
                </div>
              )}

              {activeKotTab === "BILL" && (
                <>
                  <ReactDataTable
                    items={kOTBillingProducts}
                    columns={columns}
                    isMobile={isMobile}
                  />
                  <span className="invoice-container-footer">
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
                  </span>
                </>
              )}
            </div>
          </>
        )}

        {/* {showPrintView && totalItems > 0 && (
          <InvoicePrintView
            items={items}
            subtotal={subtotal}
            tax={tax}
            total={total}
            selectedPayment={selectedPayment}
            handleBack={handleBack}
          />
        )} */}
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
            <hr />

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
                  color: guestDetails.selectedOption === "NC" ? "#fff" : "#000",
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
                    guestDetails.selectedOption === "Split" ? "#fff" : "#000",
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
                  {guestDetails.selectedOption === "NC" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          width: "60px",
                        }}
                      >
                        NC
                      </label>
                      <Form.Select
                        name="nc"
                        value={guestDetails.nc}
                        onChange={handleGuestDetailsChange}
                        style={{
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "150px",
                        }}
                      >
                        <option value="">Select NC</option>
                        <option value="nc1">NC 1</option>
                        <option value="nc2">NC 2</option>
                        <option value="nc3">NC 3</option>
                      </Form.Select>
                    </div>
                  )}
                  {guestDetails.selectedOption === "Discount" && (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          width: "60px",
                        }}
                      >
                        Discount
                      </label>
                      <Form.Select
                        name="discount"
                        value={guestDetails.discount}
                        onChange={handleGuestDetailsChange}
                        style={{
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "150px",
                        }}
                      >
                        <option value="">Select Discount</option>
                        {["5%", "10%", "15%", "20%"].map((discount, index) => (
                          <option key={index} value={`${discount}`}>
                            {discount}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  )}
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
                  onClick={() => setActiveMoreBillingOptions(false)}
                  className="theme-exit-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGuestDetailsSubmit}
                  className="theme-btn"
                  style={{
                    width: "100px",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  Apply
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
