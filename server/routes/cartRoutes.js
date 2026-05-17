// server/routes/cartRoutes.js
import express from "express";
import CartModel from "../models/cart.js";

const router = express.Router();

// GET all cart items for a user (by email)
router.get("/getCart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const items = await CartModel.find({ userId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add item to cart
router.post('/sync', async (req, res) => {
  try {
      const { userId, items } = req.body;
      // Delete existing cart for this user 
      await CartModel.deleteMany({ userId });
      // Insert all current items at once
      if (items.length > 0) {
          const cartItems = items.map(item => ({ 
            userId,
            productId: item.productId, 
            name:	item.name,
            price:	item.price,
            quantity: item.quantity,
          }));
          await CartModel.insertMany(cartItems);
      }
      res.status(200).json({ message: 'Cart saved successfully' });
   }
   catch (error) {
     res.status(500).json({ message: error.message });
   }
});

export default router;