import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductVariant = createAsyncThunk(
  "productVariant/fetchProductVariant",
  async () => {
    const response = await fetch("api/productVariant");
    const data = await response.json();
    return data;
  }
);

const productVariantSlice = createSlice({
  name: "productVariant",
  initialState: {
    productVariant: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductVariant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductVariant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productVariant = action.payload;
      })
      .addCase(fetchProductVariant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productVariantSlice.reducer;
