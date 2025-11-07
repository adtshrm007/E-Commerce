import { useEffect, useState } from "react";
import { showCart } from "../utils/GETCartItems";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      const data = await showCart();
      setCart(data);
      setLoading(false);
    }
    loadCart();
  }, []);

  if (loading)
    return <div className="text-white text-center mt-20">Loading cart...</div>;
  if (!cart || cart.items.length === 0)
    return (
      <div className="text-white text-center mt-20">Your cart is empty 🛒</div>
    );

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/cart/checkOut", {
        userId: "guest",
      });
      alert(res.data.message);
      console.log(res.data.order);
      navigate("/order");
    } catch (err) {
      console.error(err);
      alert("Checkout failed!");
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-10 px-4 font-radonregular">
      <div className="bg-gray-900 w-full max-w-5xl rounded-2xl shadow-lg p-6 text-white">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Shopping Cart
        </h1>

        <div className="divide-y divide-gray-700">
          {cart.products.map((p, index) => (
            <div
              key={p._id}
              className="flex flex-col md:flex-row items-center justify-between py-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-lg object-cover border border-gray-700"
                />
                <div>
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-gray-400 text-sm">${p.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm">
                  Qty: {cart.items[index].qty || 1}
                </p>
                <p className="text-lg font-semibold">
                  ${(p.price * (cart.items[index].qty || 1)).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t border-gray-700 pt-6 mt-6">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-2xl font-bold text-green-400">
            ${cart.total.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
