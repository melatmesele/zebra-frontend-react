import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Mycost: "0",
  MyProfit: "0",
  NetProfit: "0",
  startDate: "",
  endDate: "",
};

export const personalExpenseSlice = createSlice({
  name: "personalExpense",
  initialState,
  reducers: {
    setMyCostExpense: (state, action) => {
      state.Mycost = action.payload;
    },
    setMyProfitExpense: (state, action) => {
      state.MyProfit = action.payload;
    },
    setNetProfitExpense: (state, action) => {
      state.NetProfit = action.payload;
    },
    setStartDateExpenses: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDateExpenses: (state, action) => {
      state.endDate = action.payload;
    },
  },
});

export const {
  setMyCostExpense,
  setMyProfitExpense,
  setNetProfitExpense,
  setStartDateExpenses,
  setEndDateExpenses,
} = personalExpenseSlice.actions;
export default personalExpenseSlice.reducer;
