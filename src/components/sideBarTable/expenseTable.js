import React from "react";

import { useSelector } from "react-redux";


const ExpenseTab = () => {
  const expenseData = useSelector((state) => state.reportData.net); 

 

  return (
    <div className="overflow-x-auto bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[56px] border-4 border-primary">
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Bnet
            </th>
            <th scope="col" class="px-6 py-3">
              Initial Debt
            </th>
            <th scope="col" class="px-6 py-3">
              Snet
            </th>
            <th scope="col" class="px-6 py-3">
              TotNet
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td>{`${expenseData.startDate}-${expenseData.endDate}`}</td>
            <td>{expenseData.Bnet}</td>
            <td>{expenseData.initialDebt}</td>
            <td>{expenseData.Snet}</td>
            <td>{expenseData.TotNet}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ExpenseTab;
