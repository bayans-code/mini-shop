import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ── Called ONCE at login — loads saved cart from MongoDB ──── 
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',async (userId, { rejectWithValue }) => {
     try {
           const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/cart/getCart/${userId}`); 
           return res.data;
    } 
    catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// ── Called ONCE at checkout — saves entire cart to MongoDB ── 
export const syncCartToDB = createAsyncThunk(
  'cart/syncCartToDB',async ({ userId, items }, { rejectWithValue }) => {
     try {
         const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart/sync`, { userId, items }); return res.data;
     }
     catch (error) {
        return rejectWithValue(error.response.data.message);
     }
   }
  );
const cartSlice = createSlice({
  name:'cart',
  initialState:{
    items: [],
    isLoading: false, 
    error:  null,
  },
  reducers:{
    // Add item — if already in cart, increase quantity 
     addToCart (state, action) {
      const product = action.payload
      const existing = state.items.find(
        item => item.productId === product.product_id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          productId: product.product_id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }
    },
     // Increase quantity by 1
      increaseQty(state, action) {
        const item = state.items.find(item => item.productId === action.payload);
      if (item) {
        item.quantity += 1;
      }
     },
     // Decrease quantity — remove item if quantity reaches 0 
     decreaseQty(state, action) {
        const item = state.items.find(
        item => item.productId === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove item if quantity becomes 0
        state.items = state.items.filter(
          item => item.productId !== action.payload
        );
      }
    },
// Remove item completely 
  removeItem(state, action) {
      state.items = state.items.filter(i => i.productId !== action.payload);
   },
// Clear entire cart (called on logout) 
   clearCart(state) {
        state.items = [];
   },
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchCart.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
    // fetchCart — replace items with data from DB
      .addCase(fetchCart.fulfilled, (state, action) => { 
        state.items = action.payload;
        state.isLoading = false;
      })
    .addCase(fetchCart.rejected, (state, action) => { 
        state.error = action.payload;
        state.isLoading = false;
      })
    .addCase(syncCartToDB.pending, (state) => { 
        state.isLoading = true; 
        state.error = null;
      })
    // syncCartToDB — nothing to update in state after saving
    .addCase(syncCartToDB.fulfilled, (state) => {
       state.isLoading = false;
     })
     .addCase(syncCartToDB.rejected, (state, action) => { 
        state.error = action.payload;
        state.isLoading = false;
      })
},
})
export const { addToCart, increaseQty, decreaseQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
