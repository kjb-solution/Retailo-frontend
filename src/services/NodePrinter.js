import axios from "axios";

export const NodePrinter = async (data) => {
  try {
    console.log(data);
    
    const response = await axios.post("http://localhost:3000/print-receipt", data);
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};
