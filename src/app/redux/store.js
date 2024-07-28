import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import productCategoryReducer from "./productCategorySlice";
import productVariantReducer from "./productVariantSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    productCategory: productCategoryReducer,
    productVariant: productVariantReducer,
  },
});
