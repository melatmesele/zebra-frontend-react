import React, { useState, useEffect } from "react";
import {
  getTsCostData,
  addTsCostData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setTsCostSpent } from "../store/tsCostSlice";
const TsCostDataTable = () => {
  // const [tsCostData, setTsCostData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cost, setCost] = useState(0);
  const tsCostData = useSelector((state) => state.tsCost.tsCostSpent);
  const dispatch = useDispatch();

  const minDate = new Date(
    Math.min(...tsCostData.map((item) => new Date(item.date)))
  );
  const maxDate = new Date(
    Math.max(...tsCostData.map((item) => new Date(item.date)))
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
      const selectedId = tsCostData.find(
        (item) => item.date === formattedDate
      )?.id;
      console.log(formattedDate);

      if (selectedId) {
        try {
          const response = await addTsCostData(selectedId, cost);
          // Update the foamData state with the modified data
          if (response) {
            const updatedTsCostData = tsCostData.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    spent: response.spent,
                  }
                : item
            );
            dispatch(setTsCostSpent(updatedTsCostData));
          }
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
    <div className="bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[12rem] border-4 border-primary">
      <div className="text-2xl ml-4 md:ml-[30px] sm:mx-auto">
        Ts-Cost Data Table
      </div>
      <div className="flex flex-wrap items-center justify-center space-x-5">
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
                <label className=" text-lg pt-2">Ts-Cost:</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={cost}
                  className="w-[195px] h-[30px] p-2 rounded"
                  onChange={(e) => setCost(e.target.value)}
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
            <div>
              <div className="flex items-center pt-2  justify-between"></div>
              <div className="mt-2">
                <div className="h-[50px] p-2"></div>
              </div>
            </div>
          </div>
        </div>

        <TsCostTab />
      </div>
    </div>
  );
};

const TsCostTab = () => {
  const tsCostData = useSelector((state) => state.tsCost.tsCostSpent);
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
export default TsCostDataTable;
export { TsCostTab };
