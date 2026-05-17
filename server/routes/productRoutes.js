import express from "express";
import ProductModel from "../models/product.js";


//route handler to organize API endpoints
const router = express.Router();

//API route for GET all products
router.get("/getAllProducts", async (req, res) => {

  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
