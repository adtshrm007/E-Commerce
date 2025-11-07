import express from "express";
const router = express.Router();

import {
  addToCart,
  getCartItems,
  checkout,
} from "../controllers/cart.controller.js";

router.post("/addToCart", addToCart);

router.get("/getCartItems", getCartItems);
router.post("/checkOut", checkout);

export default router;
