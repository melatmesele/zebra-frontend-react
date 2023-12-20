import React, { useState, useEffect } from "react";
import {
  getBergamoData,
  addBergamoData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setBergamoData } from "../store/bergamo";
const BergamoDataTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bergamod, setBergamod] = useState(0);
  const [sold, setSold] = useState(0);
  const bergamoData = useSelector((state) => state.bergamoData.bergamoData);
  const dispatch = useDispatch();

  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const minDate = new Date(
    Math.min(...bergamoData.map((item) => new Date(item.date)))
  );
  const maxDate = new Date(
    Math.max(...bergamoData.map((item) => new Date(item.date)))
  );

  // Update the handleSendData function to use the formatted date
  const handleSendData = async () => {
    if (selectedDate !== null) {
      // Format the selected date to match the foam data format
      const formattedDate = formatSelectedDate(selectedDate);

      // Find the corresponding ID for the selected date
      const selectedId = bergamoData.find(
        (item) => item.date === formattedDate
      )?.id;
      // console.log(formattedDate);

      if (selectedId) {
        try {
          const response = await addBergamoData(selectedId, sold, bergamod);
          // Update the foamData state with the modified data
          const updatedBergamoData = bergamoData.map((item) =>
            item.id === selectedId
              ? {
                  ...item,
                  sold: response.sold,
                  bergamod: response.bergamod,
                }
              : item
          );
          dispatch(setBergamoData(updatedBergamoData));
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      } else {
        console.error("No id found for the selected date");
      }
    } else {
      console.error("Please select a date before sending data to the backend");
    }
  };

  return (
    <div className="bg-white w-full md:w-[800px] mx-auto mt-10 md:ml-[310px] md:mt-[56px] border-4 border-primary">
      <div className="text-2xl ml-4 md:ml-[30px]">Total Data Table</div>
      <div className="flex">
        <div className="">
          <div
            className="space-y-3 flex flex-col  max-w-md mx-auto p-8 h-400 w-full bg-white "
            action="#"
            method="POST"
          >
            <div className="mt-[3px] ">
              <div className="flex items-center justify-between">
                <label className=" text-lg pt-2">Select Date</label>
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="border-color-rgb(203 213 225) mt-2 rounded w-[195px] h-[30px] "
                dateFormat="yyyy/MM/dd"
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>

            <div className="mt-[9px]">
              <div className="flex items-center justify-between">
                <label className=" text-lg pt-2">Sold:</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={sold}
                  className="w-[195px] h-[30px] p-2 rounded"
                  onChange={(e) => setSold(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-lg pt-2">Bergamo:</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={bergamod}
                  className="w-[195px] h-[30px] p-2 rounded"
                  onChange={(e) => setBergamod(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                className="ml-[105px] h-[30px] w-[90px] rounded bg-primary"
                onClick={handleSendData}
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <BergamoTab />
      </div>
    </div>
  );
};
const BergamoTab = () => {
  const bergamoData = useSelector((state) => state.bergamoData.bergamoData);
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400  ">
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

export default BergamoDataTable;
export { BergamoTab };
