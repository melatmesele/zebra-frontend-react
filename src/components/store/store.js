import { configureStore } from "@reduxjs/toolkit";
import sprintReducer from "./sprintSlice";
import spentReducer from "./cost";
import tsCostReducer from "./tsCostSlice";
import foamDataReducer from "./foamSlice";
import cherkDataReducer from "./cherkSlice";
import bergamoDataReducer from "./bergamo";
import reportDataReducer from "./report";
import foamReportReducer from "./report";
import cherksReportReducer from "./report";
import totalsReportReducer from "./report";
import myCostsReportReducer from "./report";
import tsCostsReportReducer from "./report";
import selectedDataReducer from "./selectedCard";
import expenseReducer from "./expense";
import personalExpenseReducer from "./personalExpense";
import userIdReducer from "./userId";
import isLoggedInReducer from "./loginSlice";
export const store = configureStore({
  reducer: {
    sprint: sprintReducer,
    spent: spentReducer,
    tsCost: tsCostReducer,
    foamData: foamDataReducer,
    cherkData: cherkDataReducer,
    bergamoData: bergamoDataReducer,
    reportData: reportDataReducer,
    foamReport: foamReportReducer,
    cherksReport: cherksReportReducer,
    totalsReport: totalsReportReducer,
    myCostsReport: myCostsReportReducer,
    tsCostsReport: tsCostsReportReducer,
    selectedData: selectedDataReducer,
    expenseData: expenseReducer,
    personalExpense: personalExpenseReducer,
    userId: userIdReducer,
    isLoggedIn: isLoggedInReducer,
    
  },
});
