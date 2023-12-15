import React, { useState, useEffect } from "react";
import {
  getMyCostData,
  addMyCostData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setSpent } from "../../store/cost";
const MyCostDataTable = () => {
  // const [myCostData, setMyCostData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cost, setCost] = useState(0);
  const myCostData = useSelector((state) => state.spent.spent);
  const dispatch = useDispatch();

  // useEffect(() => {
  // const fetchMyCostData = async () => {
  //   try {
  //     const data = await getMyCostData();
  //     // dispatch(setSpent(data));
  //     return data
  //   } catch (error) {
  //     console.error("Error fetching foam data:", error);
  //   }
  // };
  // dispatch(setSpent(fetchMyCostData));
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

  //   useEffect(() => {
  //   fetchMyCostData();
  // }, []);

  // const fetchMyCostData = async () => {
  //   try {
  //     const data = await getMyCostData();
  //     dispatch(setSpent(data));
  //   } catch (error) {
  //     console.error("Error fetching foam data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchMyCostData();
  // }, [fetch]);
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
      const selectedId = myCostData.find(
        (item) => item.date === formattedDate
      )?.id;
      console.log(formattedDate);

      if (selectedId) {
        try {
          const response = await addMyCostData(selectedId, cost);
          if (response) {
            const updatedMyCostData = myCostData.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    spent: response.spent,
                  }
                : item
            );
            dispatch(setSpent(updatedMyCostData));
          }
          // Update the foamData state with the modified data

          // console.log(addMyCostData);
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
        <label>My-cost:</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <button onClick={handleSendData}>Send Data to Backend</button>
      </div>
      <MyCostTab />
    </div>
  );
};
const MyCostTab = () => {
  // const [myCostData, setMyCostData] = useState([]);
  const myCostData = useSelector((state) => state.spent.spent);
  const dispatch = useDispatch();
  console.log("Type of myCostData:", typeof myCostData);
  // const fetchMyCostData = async () => {
  //   try {
  //     const data = await getMyCostData();
  //     // dispatch(setSpent(data));
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching foam data:", error);
  //   }
  // };
  // dispatch(setSpent(fetchMyCostData));
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

    // myCostData.forEach((item) => {

    //   grandTotal += parseInt(item.spent);
    // });

    if (Array.isArray(myCostData)) {
      myCostData.forEach((item) => {
        grandTotal += parseInt(item.spent);
      });
    }

    return { grandTotal };
  };
  return (
    <div>
      <h2>My-Cost Data Table</h2>
      <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-lg text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
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
              <tr key={item.id}>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {item.date}
                </td>
                <td className="px-6 py-4">{item.spent}</td>
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

export default MyCostDataTable;
export { MyCostTab };
