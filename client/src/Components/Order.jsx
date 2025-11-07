import { useEffect, useState } from "react";
import axios from "axios";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("http://localhost:3000/api/order/getOrder");
        console.log(res);
        setOrders(res.data.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-white text-center mt-10">Loading orders...</div>
    );

  if (orders.length === 0)
    return <div className="text-white text-center mt-10">No orders yet 🛍️</div>;

  return (
    <div className="flex flex-col items-center w-full mt-10 mb-10 px-4 font-radonregular">
      <div className="bg-gray-900 w-full max-w-5xl rounded-2xl shadow-lg p-6 text-white">
        <h1 className="text-2xl font-semibold mb-6 text-center">Your Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-700 pb-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Placed on {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "Pending"
                        ? "bg-yellow-600 text-white"
                        : order.status === "Completed"
                        ? "bg-green-600 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between items-center border-b border-gray-700 pb-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-green-400 font-semibold">
                      ${item.total.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold">Total</h3>
                <p className="text-xl font-bold text-green-400">
                  ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
