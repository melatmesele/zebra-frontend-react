import React from "react";
import NavBar from "./navBar.js";
import CardApp from "../cards/cardDisplay.js";
import StartDatePicker from "./picker.js";
import ExpenseTab from "../tables/expenseTable.js";
import PersonalExpenseTab from "../tables/personalExpenseTable.js";
const HomePage = () => {
  return (
    <div className="md:fixed">
      <CardApp />
      <StartDatePicker />

      <ExpenseTab />
      <PersonalExpenseTab />
    </div>
  );
};

export default HomePage;
