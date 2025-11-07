import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { connectDB } from "./utils/connectDB.js";
import cartRoute from "./routes/cart.route.js";
import productRoute from "./routes/product.route.js";
import orderRoute from "./routes/order.route.js"

import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);
app.use("/api/order",orderRoute);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`✅ Server running at http://localhost:${process.env.PORT}`);
  });
});
