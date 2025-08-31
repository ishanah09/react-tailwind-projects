import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlistSlice";
import cartReducer from "../features/cartSlice";
import productSliceReducer from "../features/productSlice"

export const store = configureStore({
  reducer: {
    products:productSliceReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    
  },
});
