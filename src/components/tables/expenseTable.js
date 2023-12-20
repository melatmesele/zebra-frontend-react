import React, { useEffect } from "react";
import {
  getExpenseData,
} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import {
  setBnetData,
  setSnetData,
  setTotNetData,
  setInitialDebtData,
  setStartDateExpense,
  setEndDateExpense,
} from "../store/expense";

const ExpenseTab = () => {
  const bnetData = useSelector((state) => state.expenseData.bnetData);
  const snetData = useSelector((state) => state.expenseData.snetData);
  const totNetData = useSelector((state) => state.expenseData.totNetData);
  const initialDebt = useSelector((state) => state.expenseData.initialDebt);
  const startDate = useSelector((state) => state.expenseData.startDate);
  const endDate = useSelector((state) => state.expenseData.endDate);
  const dispatch = useDispatch();
 

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getExpenseData();
        dispatch(setBnetData(data.net.Bnet));
        dispatch(setSnetData(data.net.Snet));
        dispatch(setInitialDebtData(data.net.initialDebt));
        dispatch(setTotNetData(data.net.TotNet));
        dispatch(setStartDateExpense(data.net.startDate));
        dispatch(setEndDateExpense(data.net.endDate));
     
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchExpenseData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-10 py-3 whitespace-nowrap">
              Date
            </th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              Bnet
            </th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              Initial Debt
            </th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              Snet
            </th>
            <th scope="col" class="px-6 py-3 whitespace-nowrap">
              TotNet
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-12 py-3 whitespace-nowrap">{`${startDate}-${endDate}`}</td>
            <td className="whitespace-nowrap">{bnetData}</td>
            <td className="whitespace-nowrap">{initialDebt}</td>
            <td className="whitespace-nowrap">{snetData}</td>
            <td className="whitespace-nowrap">{totNetData}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ExpenseTab;
