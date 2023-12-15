import React, { useState, useEffect } from "react";
import {
  getCherkData,
  addCherkData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setCherkData } from "../../store/cherkSlice";

const CherkDataTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [profit, setProfit] = useState(0);
  const [sold, setSold] = useState(0);
  const cherkData = useSelector((state) => state.cherkData.cherkData);
  const dispatch = useDispatch();

  // useDispatch()

  // useEffect(() => {
  //   const fetchCherkData = async () => {
  //     try {
  //       const data = await getCherkData();
  //       setCherkData(data);
  //     } catch (error) {
  //       console.error("Error fetching foam data:", error);
  //     }
  //   };

  //   fetchCherkData();
  // }, []);

  // Function to format the date as "yyyy/mm/dd"
  // Function to format the date as "year/month/date"

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
      // console.log(formattedDate);

      // if (selectedId) {
      //   try {
      //     // const response = await addCherkData(selectedId, sold, profit);
      //     dispatch(addFoamDataAsync( selectedId ,sold, profit));
      //     // Update the foamData state with the modified data
      //     const updatedCherkData = cherkData.map((item) =>
      //       item.id === selectedId
      //         ? {
      //             ...item,
      //             sold: selectSelectedSold,
      //             percentage: selectSelectedPercentage,
      //           }
      //         : item
      //     );
      //     setCherkData(updatedCherkData);
      //     console.log(cherkData);
      //   } catch (error) {
      //     console.error("Error sending data to the backend:", error);
      //   }
      // }
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
        <label>percentage:</label>
        <input
          type="number"
          value={profit}
          onChange={(e) => setProfit(e.target.value)}
        />

        <label>Cherk:</label>
        <input
          type="number"
          value={sold}
          onChange={(e) => setSold(e.target.value)}
        />
        <button onClick={handleSendData}>Send Data to Backend</button>
      </div>
      <CherkTab />
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
    <div>
      <h2>Cherk Data Table</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
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
                <td>{item.percentage}</td>
                <td>{item.sold - item.percentage}</td>
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
