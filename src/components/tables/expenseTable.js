import React, { useEffect } from "react";
import {
  getExpenseData,
  getReportData,
} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import {
  setBnetData,
  setSnetData,
  setTotNetData,
  setInitialDebtData,
} from "../store/expense";
import {setMinDate, setMaxDate } from '../store/sprintSlice'

const ExpenseTab = () => {
  const bnetData = useSelector((state) => state.expenseData.bnetData);
  const snetData = useSelector((state) => state.expenseData.snetData);

  const totNetData = useSelector((state) => state.expenseData.totNetData);
  const initialDebt = useSelector((state) => state.expenseData.initialDebt);
  const startDate = useSelector((state) => state.sprint.startDate);
  const minDate = useSelector((state) => state.sprint.minDate);

  const maxDate = useSelector((state) => state.sprint.maxDate);

  const sprint_id = useSelector((state) => state.sprint.sprintId);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDataForSelectedSprint = async () => {
     

      try {
        const reportData = await getReportData(sprint_id);
      
        dispatch(
          setMinDate(
           
            reportData.foams.date)
         
          
        );
        dispatch(
          setMaxDate(
            new Date(
              Math.min(reportData.map((item) => new Date(item.foams.date)))
            )
          )
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForSelectedSprint();
  }, [dispatch, sprint_id]);



  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getExpenseData();
        dispatch(setBnetData(data.net.Bnet));
        dispatch(setSnetData(data.net.Snet));
        dispatch(setInitialDebtData(data.net.initialDebt));

        dispatch(setTotNetData(data.net.TotNet));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchExpenseData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);

  return (
    <div>
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
            <td>{minDate}</td>

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
