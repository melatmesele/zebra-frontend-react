import React from "react";

import CardApp from "../cards/cardDisplay.js";
import StartDatePicker from "./picker.js";
import ExpenseTab from "../tables/expenseTable.js";
import PersonalExpenseTab from "../tables/personalExpenseTable.js";
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen gap-4 mt-32 lg:pt-10 md:pt-4 md:mt-20 sm:mt-6">
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
