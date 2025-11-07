import express from "express"

const router=express.Router();


import { fetchAndSaveFakeProducts,getProducts, } from "../controllers/product.controller.js";


router.post("/fetch-fake-store", fetchAndSaveFakeProducts);
router.get("/getProducts",getProducts);

export default router;