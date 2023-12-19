import React, { useEffect } from "react";
import {
  getTsCostData,

} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import { setTsCostSpent } from "../store/tsCostSlice";
const TsCostReportTable = () => {
  const tsCostData = useSelector((state) => state.reportData.tsCostsReport);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTsCostData = async () => {
      try {
        const data = await getTsCostData();
        dispatch(setTsCostSpent(data));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchTsCostData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);
  const calculateTotalTsCost = () => {
    let total = 0;

    if (Array.isArray(tsCostData)) {
      tsCostData.forEach((item) => {
        total += parseInt(item.spent);
      });
    }

    return { total };
  };
  return (
    <div>
      <table className="overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Ts-Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tsCostData) ? (
            tsCostData.map((item) => (
              <tr
                key={item.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{item.date}</td>
                <td>{item.spent}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
          <tr>
            <td>
              <strong>Total:</strong>
            </td>
            <td>{calculateTotalTsCost().total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default TsCostReportTable;