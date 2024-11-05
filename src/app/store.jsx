import { configureStore } from "@reduxjs/toolkit";
import publicReducer from "./publicSlice";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    public: publicReducer,
    products: productsReducer,
    user: userReducer,
  },
});
