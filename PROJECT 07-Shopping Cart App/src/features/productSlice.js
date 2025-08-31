import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("products/fetchData", async () => {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        (state.loading = false), (state.products = action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
