import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("/api/product/getProducts");
    console.log(response.data.data);
    return response.data.data
  } catch (err) {
    return err;
  }
};
