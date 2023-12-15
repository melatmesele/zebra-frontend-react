import { createSlice } from "@reduxjs/toolkit";
// import  { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  sprintId: 0,
  isSprintActive:false
};

export const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    setSprintId: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.sprintId = action.payload;
    },

    setIsSprintActive: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isSprintActive = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSprintId, setIsSprintActive } = sprintSlice.actions;

export default sprintSlice.reducer;
