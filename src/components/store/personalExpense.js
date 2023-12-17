import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Mycost: '',
  MyProfit: '0',
  NetProfit: '0',
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
  },
});

export const { setMyCostExpense, setMyProfitExpense, setNetProfitExpense } =
  personalExpenseSlice.actions;
export default personalExpenseSlice.reducer;
