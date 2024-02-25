import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    selectedBook: {
      id: "",
      title: "",
      year: 0,
      author: "",
    },
  },
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
