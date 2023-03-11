import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
        name : "Domatesin Kilosu 3 TL",
        images : [
            "/images/products/tomatoes.jpg",
        ],
        description : "Domatesler Domatesler 10 Numara domatesler",
        price : 24,
        qty : 2,
    },
    {
        name : "Domatesin Kilosu 3 TL",
        images : [
            "/images/products/tomatoes.jpg",
        ],
        description : "Domatesler Domatesler 10 Numara domatesler",
        price : 24,
        qty : 2,
    },
    {
        name : "Domatesin Kilosu 3 TL",
        images : [
            "/images/products/tomatoes.jpg",
        ],
        description : "Domatesler Domatesler 10 Numara domatesler",
        price : 24,
        qty : 2,
    },
    {
        name : "Domatesin Kilosu 3 TL",
        images : [
            "/images/products/tomatoes.jpg",
        ],
        description : "Domatesler Domatesler 10 Numara domatesler",
        price : 24,
        qty : 2,
    },
  ],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, actions) => {
      state.cart.push(actions.payload);
    },
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
