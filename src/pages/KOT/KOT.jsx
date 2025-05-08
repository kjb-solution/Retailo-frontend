import React, { useState } from "react";
import KOT_BookedView from "./KOT_BookedView";
import KOT_Tables from "./KOT_Tables";
import "./KOT.css";
import HeaderNavLinks from "../../components/HeaderNavLinks";

const isMobile = window.innerWidth < 1024;

function KOT() {
  const [activeTab, setActiveTab] = useState("Tables");
  const [activeSettlement, setActiveSettlement] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [showOthersFields, setShowOthersFields] = useState(false);
  const [billData, setBillData] = useState({
    total: 100,
    balance: 100,
  });
  // console.log(billData);

  // State for Others fields
  const [othersFields, setOthersFields] = useState({
    cash: null,
    card: null,
    bank: { name: "", amount: null },
    credit: { name: "", amount: null },
    room: { name: "", amount: null },
    total: null,
    balance: null,
  });

  const handleSettlement = (row) => {
    console.log("settlement", row);
    // setBillData(row);
    setActiveSettlement(true);
  };

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
    setShowOthersFields(paymentType === "Others");
  };

  // Handle changes to Others fields
  const handleOthersFieldChange = (field, value, subField = null) => {
    setOthersFields((prev) => {
      const newValue = value === "" ? null : Number(value);
      if (subField) {
        return {
          ...prev,
          [field]: { ...prev[field], [subField]: value === "" ? null : value },
        };
      }
      return { ...prev, [field]: newValue };
    });
  };

  const handleSubmitSettlement = () => {
    // Normalize othersFields to replace null with 0 for submission
    const normalizedOthersFields = {
      cash: othersFields.cash ?? 0,
      card: othersFields.card ?? 0,
      bank: {
        name: othersFields.bank.name,
        amount: othersFields.bank.amount ?? 0,
      },
      credit: {
        name: othersFields.credit.name,
        amount: othersFields.credit.amount ?? 0,
      },
      room: {
        name: othersFields.room.name,
        amount: othersFields.room.amount ?? 0,
      },
    };

    const settlementData = {
      paymentType: selectedPayment,
      billData,
      others: normalizedOthersFields,
    };
    console.log("Settlement submitted with:", settlementData);
    setActiveSettlement(false);
    setSelectedPayment("");
    setShowOthersFields(false);
    // Reset Others fields
    setOthersFields({
      cash: null,
      card: null,
      bank: { name: "Axis Bank", amount: null },
      credit: { name: "Credit Ledger Name", amount: null },
      room: { name: "18 - Muniyandi Karu", amount: null },
    });
  };

  const handleCloseSlider = () => {
    setActiveSettlement(false);
    setSelectedPayment("");
    setShowOthersFields(false);
  };

  return (
    <span style={{ backgroundColor: "#f5f6fa" }}>
      <div className="kot-header-wrapper">
        <h4 className="kot-header">Create KOT</h4>
        <HeaderNavLinks
          data={[
            { name: "Home", link: "/" },
            { name: "View Sales", link: "/restaurant/view-sales" },
          ]}
        />
      </div>
      <div className="KOT-container">
        <div className="mobile-kot-nav-header">
          <div
            onClick={() => setActiveTab("Tables")}
            className={`${
              activeTab === "Tables" ? "active-kot-nav-header-main" : null
            }`}
          >
            Tables
          </div>
          <div
            onClick={() => setActiveTab("Billing")}
            className={`${
              activeTab === "Billing" ? "active-kot-nav-header-main" : null
            }`}
          >
            Billing Tables
          </div>
        </div>
        {isMobile ? (
          <>
            {activeTab === "Tables" && <KOT_Tables />}
            {activeTab === "Billing" && (
              <KOT_BookedView handleSettlement={handleSettlement} />
            )}
          </>
        ) : (
          <>
            <KOT_BookedView handleSettlement={handleSettlement} />
            <KOT_Tables />
          </>
        )}
      </div>

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
            <h3
              style={{
                marginBottom: "15px",
                fontSize: isMobile ? "30px" : "24px",
              }}
            >
              Settlement
            </h3>
            <hr />

            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  fontSize: "20px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Bill No: RF/388
              </p>
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
                    selectedPayment === "Cash" ? "#405172" : "#9AA6B2",
                  color: selectedPayment === "Cash" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handlePaymentSelect("Cash")}
              >
                CASH
              </button>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    selectedPayment === "Card" ? "#405172" : "#9AA6B2",
                  color: selectedPayment === "Card" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handlePaymentSelect("Card")}
              >
                CARD
              </button>
              <button
                style={{
                  padding: "10px 15px",
                  backgroundColor:
                    selectedPayment === "UPI" ? "#405172" : "#9AA6B2",
                  color: selectedPayment === "UPI" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 48%" : 1,
                }}
                onClick={() => handlePaymentSelect("UPI")}
              >
                UPI
              </button>
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

            {showOthersFields ? (
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
                      value={othersFields.bank.name ?? ""}
                      onChange={(e) =>
                        handleOthersFieldChange("bank", e.target.value, "name")
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
                      value={othersFields.bank.amount ?? ""}
                      onChange={(e) =>
                        handleOthersFieldChange(
                          "bank",
                          e.target.value,
                          "amount"
                        )
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
                      value={othersFields.credit.name ?? ""}
                      onChange={(e) => handleOthersFieldChange(e.target.value)}
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
                      value={othersFields.credit.amount ?? ""}
                      placeholder="Amount"
                      onChange={(e) => handleOthersFieldChange(e.target.value)}
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
                      value={othersFields.room.name ?? ""}
                      onChange={(e) => handleOthersFieldChange(e.target.value)}
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
                      value={othersFields.room.amount ?? ""}
                      onChange={(e) =>
                        handleOthersFieldChange(
                          "room",
                          e.target.value,
                          "amount"
                        )
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
            ) : (
              <p
                style={{
                  marginBottom: "20px",
                  color: "#007bff",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {selectedPayment
                  ? `You Select ${selectedPayment} Payment`
                  : "Please select a payment method"}
              </p>
            )}

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
    </span>
  );
}

export default KOT;
