import express from "express";
import CartModel from './../models/cart.js';

//route handler to organize API endpoints
const router = express.Router();

// API route for GET all cart items for, carts collection for a user
router.get('/getCart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const items = await CartModel.find({userId});
        res.status(200).json(items);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

// API route for POST an item to carts collection for a user
router.post('/addToCart', async (req, res) => {
    try{
        const {userId,productId,name,price}=req.body;
        //check if the item already exists in the cart
        const existing = await CartModel.findOne({userId,productId})
        if(existing){
            existing.quantity +=1
            await existing.save()
            return res.json(existing)
        }
        //otherwise create a new item
        const createItem = new CartModel({userId,productId,name,price,quantity:1})
        await createItem.save()
        res.json(createItem)
    }
    catch(error){
        res.status(500).json({message:'server error'})
    }
})

export default router;