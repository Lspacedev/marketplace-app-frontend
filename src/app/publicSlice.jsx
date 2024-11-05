import { createSlice } from "@reduxjs/toolkit";

export const publicSlice = createSlice({
  name: "public",
  initialState: {
    publicProducts: [],
    publicProduct: {},
    searchResults: [],
    searchTerm: "",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setPublicProducts: (state, action) => {
      state.publicProducts = action.payload;
    },
    setPublicProduct: (state, action) => {
      state.publicProduct = action.payload;
    },
  },
});
export const {
  setPublicProducts,
  setPublicProduct,
  setSearchResults,
  setSearchTerm,
} = publicSlice.actions;

export default publicSlice.reducer;
