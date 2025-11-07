import axios from "axios";
export const addItemsToCart = async (productId, qty) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/cart/addToCart",
      {
        productId,
        qty,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Added to cart:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error adding to cart:", err.response?.data || err.message);
    throw err;
  }
};
