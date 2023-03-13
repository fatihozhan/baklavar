import { configureStore } from "@reduxjs/toolkit";
import expandSlice from "@/store/expandSlice";
import cartSlice from "@/store/cartSlice";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({ cartSlice, expandSlice });

const config = {
  key: "root",
  storage,
};

const reducer = persistReducer(config, reducers);

export const store = configureStore({
  reducer: reducer,
  devTools: process.ENV !== "production",
  middleware: [thunk],
});
