import { createSlice } from "@reduxjs/toolkit";


export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWishlistitem(state, action) {
      state.push(action.payload);
    },
    removeWishlistitem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addWishlistitem, removeWishlistitem } = WishlistSlice.actions;
export default WishlistSlice.reducer;
