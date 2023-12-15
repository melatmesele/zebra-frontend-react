import { createSlice } from "@reduxjs/toolkit";
// import  { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  spent: [],
  //   isSprintActive: false,
};

export const spentSlice = createSlice({
  name: "spent",
  initialState,
  reducers: {
    setSpent: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.spent = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSpent } = spentSlice.actions;

export default spentSlice.reducer;
