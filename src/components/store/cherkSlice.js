import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cherkData: [],
};

export const cherkDataSlice = createSlice({
  name: "cherkData",
  initialState,
  reducers: {
    setCherkData: (state, action) => {
      state.cherkData = action.payload;
    },
  },
});

export const { setCherkData } = cherkDataSlice.actions;
export default cherkDataSlice.reducer;
