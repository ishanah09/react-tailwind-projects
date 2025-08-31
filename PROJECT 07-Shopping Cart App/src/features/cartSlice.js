import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      let cartProduct = { ...action.payload, quantity: 1 };
      state.push(cartProduct);
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    incrementInCart(state, action) {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },

    decrementInCart(state, action) {
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
  },
});

export const { addToCart, removeFromCart, incrementInCart, decrementInCart } =
  cartSlice.actions;
export default cartSlice.reducer;
