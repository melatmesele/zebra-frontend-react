import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bnetData: 0,
  snetData: 0,
  totNetData: 0,
  initialDebt: 0,
  startDate: "",
  endDate: "",
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
    setStartDateExpense: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDateExpense: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const {
  setBnetData,
  setSnetData,
  setTotNetData,
  setInitialDebtData,
  setStartDateExpense,
  setEndDateExpense,
} = expenseSlice.actions;
export default expenseSlice.reducer;
