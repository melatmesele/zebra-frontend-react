import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bnetData: 0,
  snetData: 0,
  totNetData: 0,
  initialDebt:0
};

export const expenseSlice = createSlice({
  name: "expenseData",
  initialState,
  reducers: {
    setBnetData: (state, action) => {
      state.bnetData = action.payload;
    },
    setSnetData: (state, action) => {
      state.snetData = action.payload;
    },
    setTotNetData: (state, action) => {
      state.totNetData = action.payload;
    },
    setInitialDebtData: (state, action) => {
      state.initialDebt = action.payload;
    },
  },
});

export const { setBnetData, setSnetData, setTotNetData, setInitialDebtData } =
  expenseSlice.actions;
export default expenseSlice.reducer;
