import React, { useEffect } from "react";
import {
  getPersonalExpenseData,
  
} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import {
  setMyCostExpense,
  setMyProfitExpense,
  setNetProfitExpense,
  setStartDateExpenses,
  setEndDateExpenses,
} from "../store/personalExpense";

const PersonalExpenseTab = () => {
  const Mycost = useSelector((state) => state.personalExpense.Mycost);
  const MyProfit = useSelector((state) => state.personalExpense.MyProfit);

  const NetProfit = useSelector((state) => state.personalExpense.NetProfit);
  const startDate = useSelector((state) => state.personalExpense.startDate);
  const endDate = useSelector(
    (state) => state.personalExpense.endDate
  );

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getPersonalExpenseData();
        dispatch(setMyCostExpense(data.PersonalProfit.Mycost));
        dispatch(setMyProfitExpense(data.PersonalProfit.MyProfit));
        dispatch(setNetProfitExpense(data.PersonalProfit.NetProfit));
        dispatch(setStartDateExpenses(data.PersonalProfit.startDate));
        dispatch(setEndDateExpenses(data.PersonalProfit.endDate));
     
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
            <th scope="col" className="px-12 py-3 whitespace-nowrap">
              Date
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              My-Profit
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              My-Cost
            </th>
            <th scope="col" className="px-6 py-3 whitespace-nowrap">
              Net-Profit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-12 py-3 whitespace-nowrap">{`${startDate}-${endDate}`}</td>
            <td className="whitespace-nowrap">{MyProfit}</td>
            <td className="whitespace-nowrap">{Mycost}</td>
            <td className="whitespace-nowrap">{NetProfit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PersonalExpenseTab;
