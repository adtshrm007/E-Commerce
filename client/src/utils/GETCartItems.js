import axios from "axios";

export const showCart = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/cart/getCartItems"
    );
    console.log(response.data.cart);
    return response.data.cart
  } catch (error) {
    return error;
  }
};
