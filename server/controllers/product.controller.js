import productModel from "../models/product.model.js";
import axios from "axios";

export const fetchAndSaveFakeProducts = async (req, res) => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;

    const formattedProducts = products.map((p) => ({
      productID: String(p.id),
      name: p.title,
      image: p.image,
      price: p.price,
    }));

    await productModel.insertMany(formattedProducts, { ordered: false });

    return res.status(201).json({
      message: "Fake Store products saved successfully",
      count: formattedProducts.length,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error saving products", error: err });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(404).json({ message: "No Products available" });
    }

    return res.status(200).json({ message: "Product Found", data: products });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
