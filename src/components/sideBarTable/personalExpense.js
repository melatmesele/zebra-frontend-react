import React from "react";

import { useSelector } from "react-redux";


const PersonalExpenseTab = () => {
  const personalExpense = useSelector(
    (state) => state.reportData.PersonalProfit
  );
 


  return (
    <div className="bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[56px] border-4 border-primary">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              My-Profit
            </th>
            <th scope="col" class="px-6 py-3">
              My-Cost
            </th>
            <th scope="col" class="px-6 py-3">
              Net-Profit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td>{`${personalExpense.startDate}-${personalExpense.endDate}`}</td>
            <td>{personalExpense.MyProfit}</td>
            <td>{personalExpense.Mycost}</td>
            <td>{personalExpense.NetProfit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PersonalExpenseTab;
