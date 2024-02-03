import React, { useState, useEffect } from "react";
import {
  getCherkData,
  addCherkData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setCherkData } from "../store/cherkSlice";

const CherkDataTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [profit, setProfit] = useState(0);
  const [sold, setSold] = useState(0);
  const cherkData = useSelector((state) => state.cherkData.cherkData);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  

  const minDate = new Date(
    Math.min(...cherkData.map((item) => new Date(item.date)))
  );
  const maxDate = new Date(
    Math.max(...cherkData.map((item) => new Date(item.date)))
  );

  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Update the handleSendData function to use the formatted date
  const handleSendData = async () => {
    if (selectedDate !== null) {
      // Format the selected date to match the foam data format
      const formattedDate = formatSelectedDate(selectedDate);

      // Find the corresponding ID for the selected date
      const selectedId = cherkData.find(
        (item) => item.date === formattedDate
      )?.id;
      if (profit <= 100) {
        setError(""); // Clear the error message if the value is valid
      }
      if (profit > 100) {
        setError("Percentage value should not be greater than 100");
      } 
      else{
      if (selectedId) {
        try {
          const response = await addCherkData(selectedId, sold, profit);
          if (response) {
            const updatedCherkData = cherkData.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    sold: response.sold,
                    percentage: response.percentage,
                  }
                : item
            );
            dispatch(setCherkData(updatedCherkData));
          }
        } catch (error) {
          console.error("Error sending data to the backend:", error);
        }
      } else {
        console.error("No id found for the selected date");
      }}
    } else {
      console.error("Please select a date before sending data to the backend");
    }
  };

  return (
    <div className="bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[12rem] border-4 border-primary">
      <div className="text-2xl ml-4 md:ml-[30px] sm:mx-auto">
        Cherk Data Table
      </div>
      <div className="flex flex-wrap items-center justify-center">
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
                <label className=" text-lg pt-2">Percentage:</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={profit}
                  className="w-[195px] h-[30px] p-2 rounded"
                  onChange={(e) => setProfit(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-lg pt-2">Cherk:</label>
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
              <button
                className="ml-[105px] h-[30px] w-[90px] rounded bg-primary"
                onClick={handleSendData}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <CherkTab />
      </div>
    </div>
  );
};
const CherkTab = () => {
  const cherkData = useSelector((state) => state.cherkData.cherkData);
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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

export default CherkDataTable;
export { CherkTab };
