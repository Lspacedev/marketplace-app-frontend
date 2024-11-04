import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
  },
});
