import React, { useState, useEffect } from "react";
import {
  getBergamoData,
  addBergamoData,
} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import { setBergamoData } from "../store/bergamo";
const BergamoReportTab = () => {
  const bergamoData = useSelector((state) => state.reportData.totalsReport);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBergamoData = async () => {
      try {
        const data = await getBergamoData();
        dispatch(setBergamoData(data));
      } catch (error) {
        console.error("Error fetching foam data:", error);
      }
    };

    fetchBergamoData();
  }, [dispatch]);
  const calculateSum = () => {
    let totalSold = 0;
    let totalCherk = 0;
    let totalBergamo = 0;
    let grandTotal = 0;

    if (Array.isArray(bergamoData)) {
      bergamoData.forEach((item) => {
        totalSold += parseInt(item.sold);
        totalCherk += parseInt(item.cherk);
        totalBergamo += parseInt(item.bergamod);
        grandTotal +=
          parseInt(item.sold) - parseInt(item.bergamod) - parseInt(item.cherk);
      });
    }

    return { totalSold, totalCherk, totalBergamo, grandTotal };
  };
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Sold
            </th>
            <th scope="col" class="px-6 py-3">
              Cherk
            </th>
            <th scope="col" class="px-6 py-3">
              Bergamo
            </th>
            <th scope="col" class="px-6 py-3">
              Snet
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(bergamoData) ? (
            bergamoData.map((item) => (
              <tr
                key={item.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{item.date}</td>
                <td>{item.sold}</td>
                <td>{item.cherk}</td>
                <td>{item.bergamod}</td>
                <td>{(item.sold - item.cherk - item.bergamod).toFixed(2)}</td>
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
            <td>{calculateSum().totalCherk}</td>
            <td>{calculateSum().totalBergamo}</td>
            <td>{calculateSum().grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BergamoReportTab;

