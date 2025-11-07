import express from "express"

const router=express.Router();

import { getOrders } from "../controllers/order.controller.js";

router.get("/getOrder",getOrders)


export default router