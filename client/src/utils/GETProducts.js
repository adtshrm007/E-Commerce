import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/product/getProducts");
    console.log(response.data.data);
    return response.data.data
  } catch (err) {
    return err;
  }
};
