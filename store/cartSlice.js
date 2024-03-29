import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* [
    {
      _id: 1,
      name: "Domatesin Kilosu 3 TL",
      images: ["/images/products/tomatoes.jpg"],
      description: "Domatesler Domatesler 10 Numara domatesler",
      price: 24,
      qty: 2,
    },
    {
      _id: 2,
      name: "Domatesin Kilosu 3 TL",
      images: ["/images/products/tomatoes.jpg"],
      description: "Domatesler Domatesler 10 Numara domatesler",
      price: 24,
      qty: 2,
    },
    {
      _id: 3,
      name: "Domatesin Kilosu 3 TL",
      images: ["/images/products/tomatoes.jpg"],
      description: "Domatesler Domatesler 10 Numara domatesler",
      price: 24,
      qty: 2,
    },
    {
      _id: 4,
      name: "Domatesin Kilosu 3 TL",
      images: ["/images/products/tomatoes.jpg"],
      description: "Domatesler Domatesler 10 Numara domatesler",
      price: 24,
      qty: 2,
    },
  ], */
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload.qty > 1) {
        const control = state.cart.find(
          (p) => p._id == action.payload.product._id
        );
        if (control) {
          state.cart.map(
            (p) =>
              p._id == action.payload.product._id && (p.qty = action.payload.qty)
          );
          return;
        }
        state.cart.push({ ...action.payload.product, qty: action.payload.qty });
      } else {
        const control = state.cart.find(
          (product) => product._id == action.payload.product._id
        );
        if (!control) {
          state.cart.push({ ...action.payload.product, qty: 1 });
        }
      }
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id != action.payload);
    },
    increaseQty: (state, action) => {
      state.cart.map(
        (product) =>
          product._id == action.payload && (product.qty = product.qty + 1)
      );
    },
    descreaseQty: (state, action) => {
      state.cart.map((product) => {
        product._id == action.payload && product.qty > 0
          ? product.qty - 1 == 0
            ? state.cart.filter((p) => p._id != action.payload)
            : (product.qty = product.qty - 1)
          : "";
      });
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { increaseQty, descreaseQty, deleteItem, addToCart, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
