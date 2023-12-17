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
    <div className="bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[56px] border-4 border-primary">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <td>{`${startDate}-${endDate}`}</td>

            <td>{bnetData}</td>
            <td>{initialDebt}</td>
            <td>{snetData}</td>
            <td>{totNetData}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ExpenseTab;
