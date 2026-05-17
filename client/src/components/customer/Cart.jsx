// src/components/customer/Cart.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart,syncCartToDB,increaseQty,decreaseQty,removeItem } from "../../features/cartSlice";

const Cart = () => {
  const dispatch	= useDispatch();
  const {userId}	= useSelector(state => state.auth);
  const { items, isLoading, error } = useSelector(state => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Task 3a: Local handlers — plain reducers, no DB call
  const handleIncrease = (productId) => dispatch(increaseQty(productId)); 
  const handleDecrease = (productId) => dispatch(decreaseQty(productId));
  const handleRemove	= (productId) => dispatch(removeItem(productId));

  // Task 3b: Checkout handler — AsyncThunk, saves all items to DB 
  const handleCheckout = () => {dispatch(syncCartToDB({ userId, items }));};
  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
        <table className="table table-bordered align-middle">          
            <tbody>
              {items.map((item) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <div>
                      <button className='btn btn-sm' onClick={() => handleDecrease(item.productId)}>−</button>
                      <span>{item.quantity}</span>
                      <button className='btn btn-sm' onClick={() => handleIncrease(item.productId)}>+</button>
                    </div>
                 </td>
                <td>{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button className='btn btn-danger btn-sm'
                         onClick={() => handleRemove(item.productId)}>
                      Remove
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
                <td colSpan={4}><strong>Total</strong></td>
                <td><strong>{total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
          </table>
          <div className='text-end mt-3'>
              <button className='btn btn-success mt-2' onClick={handleCheckout}>
                 Proceed to Checkout
              </button>
          </div>
    </div>
  );
};

export default Cart;