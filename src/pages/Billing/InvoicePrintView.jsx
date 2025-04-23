import React, { useEffect } from "react";
import "./InvoicePrintView.css";
import { Printer } from 'lucide-react';
import { printReceipt,getPrinters,findPrinterStatus,findDefaultPrinter } from "../../services/NodePrinter";

const InvoicePrintView = ({
  items,
  subtotal,
  tax,
  total,
  selectedPayment,
  handleBack,
}) => {
  const handlePrint = () => {
        // 1) Gather your invoice HTML
    // const invoiceHtml = document.getElementById("printable").outerHTML;

    // // 2) Define all your styles inline
    // const styles = `
    //   <style>
    //     body {
    //       margin: 0;
    //       padding: 0;
    //       font-family: 'PT Sans', sans-serif;
    //     }
    //     @page {
    //       size: 2.8in 11in;
    //       margin: 0;
    //     }
    //     table { width: 100%; }
    //     tr    { width: 100%; }
    //     #logo {
    //       width: 60%;
    //       margin: 0 auto;
    //       padding: 5px;
    //       display: block;
    //     }
    //     header { text-align: center; }
    //     .center-align { text-align: center; }
    //     .bill-details td { font-size: 12px; }
    //     .receipt { font-size: medium; }
    //     .items .heading {
    //       font-size: 12.5px;
    //       text-transform: uppercase;
    //       border-top: 1px solid black;
    //       margin-bottom: 4px;
    //       border-bottom: 1px solid black;
    //       vertical-align: middle;
    //     }
    //     .items thead th:first-child,
    //     .items tbody td:first-child {
    //       width: 47%;
    //       word-break: break-all;
    //       text-align: left;
    //     }
    //     .items td {
    //       font-size: 12px;
    //       text-align: right;
    //       vertical-align: bottom;
    //     }
    //     .price::before {
    //       content: "\\20B9";
    //       font-family: Arial;
    //     }
    //     .sum-up { text-align: right !important; }
    //     .total {
    //       font-size: 13px;
    //       border-top: 1px dashed black !important;
    //       border-bottom: 1px dashed black !important;
    //     }
    //     .total.text, .total.price { text-align: right; }
    //     .total.price::before { content: "\\20B9"; }
    //     .line { border-top: 1px solid black !important; }
    //     p { padding: 1px; margin: 0; }
    //     section, footer { font-size: 12px; text-align: center; display:flex; flex-direction: column;}
    //   </style>
    // `;

    // // 3) Open a new window and write the full HTML
    // const printWindow = window.open("", "_blank", `width=${window.screen.width},height=${window.screen.height}`);

    //  printWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Invoice</title>
    //       ${styles}
    //     </head>
    //     <body>
    //       ${invoiceHtml}
    //     </body>
    //   </html>
    // `);
    // printWindow.document.close();
    // printWindow.focus();

    // // 4) Print and then close
    // printWindow.print();
    // printWindow.close();
    const data = {
      items,
      subtotal,
      tax,
      total,
      selectedPayment,
      gstNumber: "4910487129047124",
      date: new Date().toLocaleDateString(),
      billNumber: "4",
      companyName: "KJB SOLUTION",
      cgst: (tax / 2).toFixed(2),
      sgst: (tax / 2).toFixed(2)
    };
    printReceipt(data);
    // getPrinters();
    // findPrinterStatus("EPSON TM-T82 Receipt");
    // findDefaultPrinter();

  };
 

  return (
    <div>
    

      {/* Invoice markup */}
      <div id="printable">
        <header>
          <div id="logo">{/* optional logo here */}</div>
        </header>

        <p></p>

        <table className="bill-details">
          <tbody>
            <tr>
              <td>GST Number : 4910487129047124</td>
        
            </tr>
            <tr>
              <td>Date : <span>{new Date().toLocaleDateString()}</span></td>
              {/* <td>Time : <span>{new Date().toLocaleTimeString()}</span></td> */}
            </tr>
            <tr>
              {/* <td>Table #: <span>3</span></td> */}
              <td>Bill # : <span>4</span></td>
            </tr>
            <tr>
              <th className="center-align" colSpan="2">
                <span className="receipt">KJB SOLUTION</span>
              </th>
            </tr>
          </tbody>
        </table>

        <table className="items">
          <thead>
            <tr>
              <th className="heading name">Item</th>
              <th className="heading qty">Qty</th>
              <th className="heading rate">Rate</th>
              <th className="heading amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td className="price">{item.price.toFixed(2)}</td>
                <td className="price">
                  {(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="sum-up line">Subtotal</td>
              <td className="line price">{subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3" className="sum-up">CGST</td>
              <td className="price">{(tax / 2).toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="3" className="sum-up">SGST</td>
              <td className="price">{(tax / 2).toFixed(2)}</td>
            </tr>
            <tr>
              <th colSpan="3" className="total text">Total</th>
              <th className="total price">{total.toFixed(2)}</th>
            </tr>
          </tbody>
        </table>

        

        <footer>
          <span>Paid via  <span>{selectedPayment}</span></span>
          <span className="center-align">Make sure to come Again</span>
          {/* <p>Make sure to come Again!</p> */}
          
        </footer>
      </div>
        {/* Buttons */}
        <div style={{ textAlign: "center", margin: "10px 0", display: "flex", justifyContent: "center",position:"sticky",bottom:"0px", backgroundColor:"var(--theme-bg-billing-color)",padding:"15px" }}>
        <button
          onClick={handlePrint}
          style={{
            margin: "0 8px",
            padding: "6px 12px",
            fontSize: "14px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Printer size={15} />
          Print
        </button>
        <button
          onClick={handleBack}
          style={{
            margin: "0 8px",
            padding: "6px 12px",
            fontSize: "14px",
            background: "#e53935",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default InvoicePrintView;