import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductCategory = createAsyncThunk(
  "productCategory/fetchProductCategory",
  async () => {
    const response = await fetch("api/productCategory");
    const data = await response.json();
    return data;
  }
);

const productCategorySlice = createSlice({
  name: "productCategory",
  initialState: {
    productCategory: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productCategory = action.payload;
      })
      .addCase(fetchProductCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productCategorySlice.reducer;
