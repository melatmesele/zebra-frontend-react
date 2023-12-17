import React from "react";

import CardApp from "../cards/cardDisplay.js";
import StartDatePicker from "./picker.js";
import ExpenseTab from "../tables/expenseTable.js";
import PersonalExpenseTab from "../tables/personalExpenseTable.js";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen space-around">
      <div className="">
        <CardApp />
      </div>

      <div className="flex flex-row justify-center gap-4 mb-4">
        <ExpenseTab />
        <PersonalExpenseTab />
      </div>

      <div className="fixed bottom-4 left-4">
        <StartDatePicker />
      </div>
    </div>
  );
};

export default HomePage;
