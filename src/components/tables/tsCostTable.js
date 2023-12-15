import React, { useState, useEffect } from "react";
import {
  getTsCostData,
  addTsCostData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setTsCostSpent } from "../../store/tsCostSlice";
const TsCostDataTable = () => {
  // const [tsCostData, setTsCostData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [spent, setSpent] = useState(0);
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
  // Function to format the date as "yyyy/mm/dd"
  // Function to format the date as "year/month/date"
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
          const response = await addTsCostData(selectedId, spent);
          // Update the foamData state with the modified data
          if (response) {
            const updatedTsCostData = tsCostData.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    sold: response.spent,
                  }
                : item
            );
            dispatch(setSpent(updatedTsCostData));
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
    <div className="bg-white">
      <div className="flex">
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded"
          dateFormat="yyyy/MM/dd"
        />
        <label>Ts-cost:</label>
        <input
          type="number"
          value={spent}
          onChange={(e) => setSpent(e.target.value)}
        />

        <button onClick={handleSendData}>Send Data to Backend</button>
      </div>
      <TsCostTab />
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
    <div>
      <h2>Ts-Cost Data Table</h2>
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
