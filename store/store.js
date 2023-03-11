import { configureStore } from "@reduxjs/toolkit";
import expandSlice from "@/store/expandSlice";
import cartSlice from "@/store/cartSlice";

export const store = configureStore({
  reducer: {
    expandSlice,
    cartSlice,
  },
});
