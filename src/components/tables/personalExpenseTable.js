import React, { useEffect } from "react";
import {
  getExpenseData,
  
} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import {
  setMyCostExpense,
  setMyProfitExpense,
  setNetProfitExpense,
  setStartDateExpense,
  setEndDateExpense,
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
        const data = await getExpenseData();
        dispatch(setMyCostExpense(data.PersonalProfit.Mycost));
        dispatch(setMyProfitExpense(data.PersonalProfit.MyProfit));
        dispatch(setNetProfitExpense(data.PersonalProfit.NetProfit));
        dispatch(setStartDateExpense(data.PersonalProfit.startDate));
        dispatch(setEndDateExpense(data.PersonalProfit.endDate));
     
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
            <td>{`${startDate}-${endDate}`}</td>
            <td>{MyProfit}</td>
            <td>{Mycost}</td>
            <td>{NetProfit}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default PersonalExpenseTab;
