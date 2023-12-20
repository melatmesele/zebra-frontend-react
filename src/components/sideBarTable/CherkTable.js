import React, {  useEffect } from "react";
import {
  getCherkData,

} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import { setCherkData } from "../store/cherkSlice";
const CherkReportTable = () => {
  const cherkData = useSelector((state) => state.reportData.cherksReport);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCherkData = async () => {
      try {
        const data = await getCherkData();
        dispatch(setCherkData(data));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchCherkData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);

  const calculateSum = () => {
    let totalSold = 0;
    let totalPercentage = 0;
    let grandTotal = 0;

    // cherkData.forEach((item) => {
    //   totalSold += parseInt(item.sold);
    //   totalPercentage += parseInt(item.percentage);
    //   grandTotal += parseInt(item.sold) - parseInt(item.percentage);
    // });

    // return { totalSold, totalPercentage, grandTotal };
    if (Array.isArray(cherkData)) {
      cherkData.forEach((item) => {
        totalSold += parseInt(item.sold);
        totalPercentage += parseInt(item.percentage);
        grandTotal += parseInt(item.sold) - parseInt(item.percentage);
      });
    }

    return { totalSold, totalPercentage, grandTotal };
  };
  return (
    <div>
      <table className="overflow-x-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Cherk
            </th>
            <th scope="col" class="px-6 py-3">
              Percentage
            </th>
            <th scope="col" class="px-6 py-3">
              total
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cherkData) ? (
            cherkData.map((item) => (
              <tr
                key={item.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{item.date}</td>
                <td>{item.sold}</td>
                <td>{item.percentage.toFixed(2)}</td>
                <td>{(item.sold - item.percentage).toFixed(2)}</td>
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
            <td>{calculateSum().totalSold}</td>
            <td>{calculateSum().totalPercentage}</td>
            <td>{calculateSum().grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CherkReportTable;
