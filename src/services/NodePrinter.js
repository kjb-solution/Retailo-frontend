import axios from "axios";

// Send data to the Node.js server to print the receipt
export const printReceipt = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/print-receipt",        
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

// Get all available printers
export const getPrinters = async () => {
  try {
    const response = await axios.get("http://localhost:3000/get-all-printers");
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

export const findPrinterStatus = async (printerName) => {
  try {
    if(!printerName){
      return console.log("Provide a PrinterName to check its status");
    }
    const response = await axios.post("http://localhost:3000/check-printer-status",{printerName});
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

export const findDefaultPrinter = async () => {
  try {     
    const response = await axios.get("http://localhost:3000/get-default-printer");
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}
