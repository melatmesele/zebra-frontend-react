import React from "react";

import CardApp from "../cards/cardDisplay.js";
import StartDatePicker from "./picker.js";
import ExpenseTab from "../tables/expenseTable.js";
import PersonalExpenseTab from "../tables/personalExpenseTable.js";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen gap-10 mt-20 md:mt-10 sm:mt-6">
      <div>
        <CardApp />
      </div>

      <div className="flex flex-row flex-wrap justify-center gap-4 mb-4">
        <ExpenseTab />
        <PersonalExpenseTab />
      </div>

      <div className="w-full">
        <StartDatePicker />
      </div>
    </div>
  );
};

export default HomePage;
