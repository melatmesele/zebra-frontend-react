import { createSlice } from "@reduxjs/toolkit";
// import  { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  tsCostSpent: [],
  //   isSprintActive: false,
};

export const tsCostSlice = createSlice({
  name: "tsCost",
  initialState,
  reducers: {
    setTsCostSpent: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.tsCostSpent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTsCostSpent } = tsCostSlice.actions;

export default tsCostSlice.reducer;
