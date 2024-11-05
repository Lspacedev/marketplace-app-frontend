import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
});
export const { setReviews } = reviewsSlice.actions;

export default reviewsSlice.reducer;
