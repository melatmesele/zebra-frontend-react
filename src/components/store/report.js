import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reportData: [],
    foamReport:[],
    cherksReport :[],
    totalsReport:[],
    myCostsReport:[],
    tsCostsReport:[],
    net: {
    startDate: "",
    endDate: "",
    Bnet: 0,
    initialDebt: 0,
    Snet: 0,
    TotNet: 0,
  },
  PersonalProfit: {
    startDate: "",
    endDate: "",
    Mycost: 0,
    MyProfit: 0,
    NetProfit: 0,
  },

};

export const reportDataSlice = createSlice({
  name: "reportData",
  initialState,
  reducers: {
    setReportData: (state, action) => {
      state.reportData = action.payload;
    },
    setFoamReport: (state, action) => {
      state.foamReport = action.payload;
    },
    setCherkReport: (state, action) => {
      state.cherksReport = action.payload;
    },
    setTotalsReport: (state, action) => {
      state.totalsReport = action.payload;
    },
    setMyCostReport: (state, action) => {
      state.myCostsReport = action.payload;
    },
    setTsCostReport: (state, action) => {
      state.tsCostsReport = action.payload;
    },
    setExpenseReport: (state, action) => {
      state.net = action.payload;
    },
    setPersonalExpenseReport: (state, action) => {
      state.PersonalProfit = action.payload;
    },
  },
});

export const {
  setReportData,
  setFoamReport,
  setCherkReport,
  setTotalsReport,
  setMyCostReport,
  setTsCostReport,
  setPersonalExpenseReport,
  setExpenseReport,
} = reportDataSlice.actions;
export default reportDataSlice.reducer;
