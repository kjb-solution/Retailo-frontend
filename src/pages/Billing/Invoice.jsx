import React, { useState, useEffect, use } from "react";
import DataTable from "react-data-table-component";
import "./Invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Printer } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrinterLoading from "../../assets/PrinterLoading.webm";
import NoItemImg from '../../assets/NoItemImg.webp'

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
import { Form, Button } from "react-bootstrap";



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
  const [showOthersFields, setShowOthersFields] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [billData, setBillData] = useState({
    total: 100,
    balance: 100,
  });
  const [activeMoreBillingOptions, setActiveMoreBillingOptions] =
    useState(false);
  const initialGuestDetails = {
    pin1: 0,
    pin2: 0,
    selectedOption: null,
    discount: 0,
    nc: 0,
  };
  // State for Others fields
  const initialOthersFields = {
    cash: null,
    card: null,
    bankName: "",
    bankAmount: null,
    creditName: "",
    creditAmount: null,
    roomName: "",
    roomAmount: null,
    total: billData.total,
    balance: billData.balance,
  };

  const [guestDetails, setGuestDetails] = useState(initialGuestDetails);
  const [othersFields, setOthersFields] = useState(initialOthersFields);
  const [activeSettlement, setActiveSettlement] = useState(false);

  // console.log(billData);
  const handleOthersFieldChange = (field, value) => {
    console.log(field, value);

    setOthersFields((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmitSettlement = () => {
    console.log("Settlement submitted with:", othersFields);
    setActiveSettlement(false);
    setSelectedPayment("");
    setShowOthersFields(false);
    // Reset Others fields
    setOthersFields(initialOthersFields);
    setSelectedPayment("UPI");
  };
  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
    setShowOthersFields(paymentType === "Others");
  };

  const handleCloseSlider = () => {
    setActiveSettlement(false);
    setSelectedPayment("");
    setShowOthersFields(false);
    setSelectedPayment("UPI");
  };

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
          <div style={{width:"100%",position:"relative"}}>

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
            {items && items.length === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "25%",
                  left: isMobile ? "6%" : "0",
                  opacity: "0.2",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={NoItemImg}
                  alt="No KOT"
                  height={isMobile ? "fit-content" : "fit-content"}
                  width={isMobile ? "90%" : "100%"}
                />
              </div>
            )}
          </div>

            <div className="invoice-footer">
            <div className="invoice-summary">
                {/* <div className="summary-row">
                  <span>Sub Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div> */}
                <div className="summary-row">
                  <span>CGST/SGST</span>
                  <span>
                    <span>₹{tax.toFixed(2) + "/"}</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </span>
                </div>
                {items && Array.isArray(items) && (
                  <>
                    <div className="summary-row">
                      <span>Net</span>
                      <span>
                        ₹
                        {items
                          .reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="summary-row">
                      <span>Qty</span>
                      <span>{totalItems}</span>
                    </div>
                  </>
                )}
                <div className="summary-row total">
                  <span>Total Payment</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="payment-methods">
                <button
                  className={`payment-button ${
                    selectedPayment === "Cash Payout" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPayment("Cash Payout")}
                >
                  <FontAwesomeIcon icon={faMoneyBillWave} /> Cash
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
                    selectedPayment === "Card" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPayment("Card")}
                >
                  <FontAwesomeIcon icon={faCreditCard} /> Card
                </button>
                <button
                  className={`payment-button ${
                    selectedPayment === "Others" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveSettlement(true);
                    setSelectedPayment("Others");
                  }}
                >
                  Others
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
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ fontSize: isMobile ? "30px" : "24px" }}>
                Guest Details
              </h3>
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

            {/* Option Buttons */}
            <div
              className="guest-details-actions"
              style={{ display: "flex", gap: "10px", marginBottom: "15px" }}
            >
              {["NC", "Discount", "Split"].map((option) => (
                <button
                  key={option}
                  style={{
                    padding: "10px 15px",
                    backgroundColor:
                      guestDetails.selectedOption === option
                        ? "#405172"
                        : "#9AA6B2",
                    color:
                      guestDetails.selectedOption === option ? "#fff" : "#000",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    flex: isMobile ? "1 1 48%" : 1,
                  }}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Guest Details Form */}

            <div className="guest-details-form">
              {(guestDetails.selectedOption === "NC" ||
                guestDetails.selectedOption === "Discount") && (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "flex-end",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                    marginBottom: "20px",
                  }}
                >
                  {/* PIN Field */}
                  <Form.Group
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Form.Label
                      style={{ fontSize: isMobile ? "14px" : "16px" }}
                    >
                      PIN
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="PIN"
                      name="pin1"
                      value={guestDetails.pin1}
                      onChange={handleGuestDetailsChange}
                      style={{
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        width: "100px",
                      }}
                    />
                  </Form.Group>

                  {/* NC Dropdown */}
                  {guestDetails.selectedOption === "NC" && (
                    <Form.Group
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Form.Label
                        style={{ fontSize: isMobile ? "14px" : "16px" }}
                      >
                        NC
                      </Form.Label>
                      <Form.Select
                        name="nc"
                        value={guestDetails.nc}
                        onChange={handleGuestDetailsChange}
                        style={{
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "160px",
                        }}
                      >
                        <option value="">Select NC</option>
                        <option value="nc1">NC 1</option>
                        <option value="nc2">NC 2</option>
                        <option value="nc3">NC 3</option>
                      </Form.Select>
                    </Form.Group>
                  )}

                  {/* Discount Dropdown */}
                  {guestDetails.selectedOption === "Discount" && (
                    <Form.Group
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Form.Label
                        style={{ fontSize: isMobile ? "14px" : "16px" }}
                      >
                        Discount
                      </Form.Label>
                      <Form.Select
                        name="discount"
                        value={guestDetails.discount}
                        onChange={handleGuestDetailsChange}
                        style={{
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "160px",
                        }}
                      >
                        <option value="">Select Discount</option>
                        {["5%", "10%", "15%", "20%"].map((discount, index) => (
                          <option key={index} value={discount}>
                            {discount}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {(guestDetails.selectedOption === "Split" ||
                guestDetails.selectedOption === "Discount" ||
                guestDetails.selectedOption === "NC") && (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                    marginTop: "20px",
                  }}
                >
                  <button
                    variant="outline-secondary"
                    className="theme-exit-btn"
                    onClick={() => {
                      setActiveMoreBillingOptions(false);
                      setGuestDetails(initialGuestDetails);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="theme-btn"
                    onClick={handleGuestDetailsSubmit}
                    style={{
                      width: "100px",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSettlement && (
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
                  activeSettlement ? "slideInFromRight" : "slideOutToRight"
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
            <div style={{ marginBottom: "20px" }}>
              {/* <p
                style={{
                  fontSize: "20px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Bill No: RF/388
              </p> */}
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "space-between",
                  padding: "5px 0px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "0px",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <label htmlFor="total">Total: </label>
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                      marginLeft: "5px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    value={billData?.total}
                    id="total"
                    disabled
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0px",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <label htmlFor="balance">Balance: </label>
                  <span
                    style={{
                      fontSize: "11px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                      marginLeft: "5px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    style={{ width: "100px" }}
                    type="number"
                    value={billData?.balance}
                    id="balance"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    selectedPayment === "Others" ? "#405172" : "#9AA6B2",
                  color: selectedPayment === "Others" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handlePaymentSelect("Others")}
              >
                OTHERS
              </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "100px 1fr",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Cash
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={othersFields.cash ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("cash", e.target.value)
                    }
                    placeholder="Cash amount"
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "0 4px 4px 0",
                      fontSize: "14px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "100px 1fr",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Card
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={othersFields.card ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("card", e.target.value)
                    }
                    placeholder="Card amount"
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "0 4px 4px 0",
                      fontSize: "14px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "100px 1fr",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Bank
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    value={othersFields.bankName ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("bankName", e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      flex: 1,
                      marginRight: "5px",
                    }}
                  >
                    <option>Select</option>
                    <option>Axis Bank</option>
                  </select>
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={othersFields.bankAmount ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("bankAmount", e.target.value)
                    }
                    placeholder="Amount"
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "0 4px 4px 0",
                      fontSize: "14px",
                      width: isMobile ? "50%" : "100px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "100px 1fr",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                }}
              >
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Credit
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    value={othersFields.creditName ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("creditName", e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      flex: 1,
                      marginRight: "5px",
                      width: "100%",
                    }}
                    placeholder="Credit"
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={othersFields.creditAmount ?? ""}
                    placeholder="Amount"
                    onChange={(e) =>
                      handleOthersFieldChange("creditAmount", e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "0 4px 4px 0",
                      fontSize: "14px",
                      width: isMobile ? "50%" : "100px",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "80px 1fr" : "100px 1fr",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "15px",
                  width: "100%",
                }}
              >
                <label style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Room
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    value={othersFields.roomName ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("roomName", e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "14px",
                      flex: 1,
                      marginRight: "5px",
                      width: "100%",
                    }}
                  >
                    <option>Select</option>
                    <option value={"18 - Muniyandi Karu"}>
                      18 - Muniyandi Karu
                    </option>
                  </select>
                  <span
                    style={{
                      fontSize: "14px",
                      backgroundColor: "#F1EFEC",
                      border: "1px solid #ccc",
                      borderRight: "none",
                      padding: "5px 10px",
                      borderRadius: "4px 0 0 4px",
                    }}
                  >
                    ₹
                  </span>
                  <input
                    type="number"
                    value={othersFields.roomAmount ?? ""}
                    onChange={(e) =>
                      handleOthersFieldChange("roomAmount", e.target.value)
                    }
                    placeholder="Amount"
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "0 4px 4px 0",
                      fontSize: "14px",
                      width: isMobile ? "50%" : "100px",
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
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <button className="theme-exit-btn" onClick={handleCloseSlider}>
                Cancel
              </button>
              <button
                className="theme-btn"
                style={{ width: "25%", justifyContent: "center" }}
                onClick={handleSubmitSettlement}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Invoice;
