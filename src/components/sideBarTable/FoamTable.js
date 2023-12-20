import React from "react";
import { useSelector } from "react-redux";
const FoamSideBarTab = () => {
  const foamReport = useSelector((state) => state.reportData.foamReport);
 



  const calculateSum = () => {
    let totalSold = 0;
    let totalPercentage = 0;
    let grandTotal = 0;

    // foamData.forEach((item) => {
    //   totalSold += parseInt(item.sold);
    //   totalPercentage += parseInt(item.percentage);
    //   grandTotal += parseInt(item.sold) - parseInt(item.percentage);
    // });

    // return { totalSold, totalPercentage, grandTotal };
    if (Array.isArray(foamReport)) {
      foamReport.forEach((item) => {
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
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
          <tr>
            <th scope="col" class="px-10 py-3">
              Date
            </th>
            <th scope="col" class="px-6 py-3">
              Sold
            </th>
            <th scope="col" class="px-6 py-3">
              Percentage
            </th>
            <th scope="col" class="px-6 py-3">
              Bnet
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(foamReport) ? (
            foamReport.map((item) => (
              <tr
                key={item.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{item.date}</td>
                <td>{item.sold}</td>
                <td>{item.percentage}</td>
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

export default FoamSideBarTab;
