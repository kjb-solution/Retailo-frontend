import React, { useState, useEffect } from "react";
import "../../Billing/Invoice.css";
import "./KOT-invoice.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListPlus,
  Printer,
  ReceiptText,
  Save,
  UserRoundPen,
  UtensilsCrossed,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import { faPlus, faMinus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactDataTable from "./ReactDataTable";
import { StaffSVG } from "../../../assets/image";
import { printReceipt } from "../../../services/NodePrinter";
import PrinterLoading from "../../../assets/PrinterLoading.webm";
import NoKotImg from "../../../assets/NoKotImg.webp";
import NoItemImg from "../../../assets/NoItemImg.webp";

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
  const [activeKotTab, setActiveKotTab] = useState("BILL");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isPrinting, setIsPrinting] = useState(false);
  const [activeMoreBillingOptions, setActiveMoreBillingOptions] =
    useState(false);
  const [kOTBillingQuantity, setKOTBillingQuantity] = useState(0);

  const initialGuestDetails = {
    pin1: null,
    pin2: null,
    selectedOption: null,
    discount: 0,
    nc: 0,
  };
  useEffect(() => {
    if (kOTBillingProducts === undefined) {
      return;
    }
    setKOTBillingQuantity(
      kOTBillingProducts.reduce((acc, item) => acc + item.quantity, 0)
    );
  }, [kOTBillingProducts]);

  useEffect(() => {
    if (KOT_items === undefined) {
      return;
    }

    if (KOT_items.length > 0) {
      setActiveKotTab("KOT");
    } else {
      setActiveKotTab("BILL");
    }
  }, [KOT_items]);

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
      width: isMobile ? "20px" : "5%",
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
      width: isMobile ? "20px" : "5%",
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
                {/* <div
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
                </div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "3px",
                    backgroundColor: "rgb(224 224 224)", // light blue background for container
                    padding: "4px 3px",
                    borderRadius: "9999px", // pill shape
                    width: "fit-content",
                  }}
                >
                  <div
                    onClick={() => setActiveKotTab("KOT")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      backgroundColor:
                        activeKotTab === "KOT" ? "#007bff" : "transparent",
                      color: activeKotTab === "KOT" ? "#ffffff" : "#007bff",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    <UtensilsCrossed size={15} />
                    <span style={{ display: "flex", alignItems: "center" }}>
                      KOT{" "}
                      <span
                        style={{
                          marginLeft: "6px",
                          backgroundColor: "#ffffff",
                          color: "#007bff",
                          borderRadius: "9999px",
                          padding: "2px 8px",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {totalItems}
                      </span>
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveKotTab("BILL")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "4px 8px",
                      borderRadius: "9999px",
                      backgroundColor:
                        activeKotTab === "BILL" ? "#007bff" : "transparent",
                      color: activeKotTab === "BILL" ? "#ffffff" : "#007bff",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    <ReceiptText size={15} />
                    BILL
                    <span
                      style={{
                        marginLeft: "6px",
                        backgroundColor: "#ffffff",
                        color: "#007bff",
                        borderRadius: "9999px",
                        padding: "2px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {kOTBillingQuantity}
                    </span>
                  </div>
                </div>

                <div
                  className="KOT-staff-tab"
                  style={{
                    border: "1px solid #000",
                    color: "var(--theme-menu-bg-color)",
                    // backgroundColor: "rgb(50, 100, 220,0.1)",
                  }}
                >
                  <StaffSVG />
                  <Form.Select
                    className="kot-staff-select user-form-select"
                    style={{
                      backgroundColor: "var(--theme-menu-bg-color)",
                      color: "#000",
                      border: "none",
                      fontWeight: "bold",
                      // maxWidth: "150px",
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
                  {KOT_items && KOT_items.length === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10%",
                        left: isMobile ? "2%" : "0",
                        opacity: "0.2",
                        width: "100%",
                        // height: "100%",
                      }}
                    >
                      <img
                        src={NoKotImg}
                        alt="No KOT"
                        height={isMobile ? "60%" : "fit-content"}
                        width={isMobile ? "100%" : "100%"}
                      />
                    </div>
                  )}

                  <div className="KOT-create-btn-container">
                    <div className="invoice-footer">
                      <div className="invoice-summary">
                        {/* <div className="summary-row">
                          <span>CGST/SGST</span>
                          <span>
                            <span>₹{tax.toFixed(2) + "/"}</span>
                            <span>₹{tax.toFixed(2)}</span>
                          </span>
                        </div> */}
                        {kOTBillingProducts &&
                          Array.isArray(kOTBillingProducts) && (
                            <>
                              <div className="summary-row">
                                <span>Net</span>
                                <span>
                                  ₹
                                  {KOT_items.reduce(
                                    (acc, item) =>
                                      acc + item.price * item.quantity,
                                    0
                                  ).toFixed(2)}
                                </span>
                              </div>
                              <div className="summary-row">
                                <span>Quantity</span>
                                <span>{totalItems}</span>
                              </div>
                            </>
                          )}
                        <div className="summary-row total">
                          <span>Total</span>
                          <span>
                            ₹
                            {KOT_items.reduce(
                              (acc, item) => acc + item.price * item.quantity,
                              0
                            ).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

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
                  {kOTBillingProducts && kOTBillingProducts.length === 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10%",
                        left: isMobile ? "6%" : "0",
                        opacity: "0.2",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        src={NoItemImg}
                        alt="No KOT"
                        height={isMobile ? "60%" : "fit-content"}
                        width={isMobile ? "90%" : "100%"}
                      />
                    </div>
                  )}
                  <span className="invoice-container-footer">
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
                        {kOTBillingProducts &&
                          Array.isArray(kOTBillingProducts) && (
                            <>
                              <div className="summary-row">
                                <span>Net</span>
                                <span>
                                  ₹
                                  {kOTBillingProducts
                                    .reduce(
                                      (acc, item) =>
                                        acc + item.price * item.quantity,
                                      0
                                    )
                                    .toFixed(2)}
                                </span>
                              </div>
                              <div className="summary-row">
                                <span>Qty</span>
                                <span>{kOTBillingQuantity}</span>
                              </div>
                            </>
                          )}
                        <div className="summary-row total">
                          <span>Total Payment</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
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
                        <Save />
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
                      name="pin1"
                      placeholder="PIN"
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
    </>
  );
};
export default Invoice;
