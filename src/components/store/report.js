import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reportData: [],
    foamReport:[],
    cherksReport :[],
    totalsReport:[],
    myCostsReport:[],
    tsCostsReport:[]
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
  },
});

export const {
  setReportData,
  setFoamReport,
  setCherkReport,
  setTotalsReport,
  setMyCostReport,
  setTsCostReport,
} = reportDataSlice.actions;
export default reportDataSlice.reducer;
