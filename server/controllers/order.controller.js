import orderModel from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const userId = "guest"; // demo user
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found", data: [] });
    }

    return res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({
      message: "Server error while fetching orders",
      error: err.message,
    });
  }
};
