import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"users" , required: true},
    productId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, // removed unique
    quantity: {type: Number, required: true}
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carts", cartSchema);
export default CartModel;