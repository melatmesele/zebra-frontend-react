import React, {  useEffect } from "react";
import {
  getMyCostData,

} from "../../api-helper-function/apiCallerFunction";

import { useSelector, useDispatch } from "react-redux";
import { setSpent } from "../../store/cost";
const MyCostReportTable = () => {
  // const [myCostData, setMyCostData] = useState([]);
  const myCostData = useSelector((state) => state.reportData.myCostsReport);
  const dispatch = useDispatch();
  console.log("Type of myCostData:", typeof myCostData);
  
  useEffect(() => {
    const fetchMyCostData = async () => {
      try {
        const data = await getMyCostData();
        dispatch(setSpent(data));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchMyCostData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);
  const calculateSum = () => {
    let grandTotal = 0;

    if (Array.isArray(myCostData)) {
      myCostData.forEach((item) => {
        grandTotal += parseInt(item.spent);
      });
    }

    return { grandTotal };
  };
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              My-Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(myCostData) ? (
            myCostData.map((item) => (
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
            <td>{calculateSum().grandTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MyCostReportTable;