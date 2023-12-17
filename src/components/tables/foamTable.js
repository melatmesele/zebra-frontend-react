import React, { useState, useEffect } from "react";
import {
  getFoamData,
  addFoamData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setFoamData } from "../store/foamSlice";

const FoamDataTable = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [profit, setProfit] = useState(0);
  const [sold, setSold] = useState(0);
  const foamData = useSelector((state) => state.foamData.foamData);

  const dispatch = useDispatch();

 
  useEffect(() => {
    const fetchFoamData = async () => {
      try {
        const data = await getFoamData();
        dispatch(setFoamData(data));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchFoamData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);

  const minDate = new Date(
    Math.min(...foamData.map((item) => new Date(item.date)))
  );
  const maxDate = new Date(
    Math.max(...foamData.map((item) => new Date(item.date)))
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
      const formattedDate = formatSelectedDate(selectedDate);
      const selectedId = foamData.find(
        (item) => item.date === formattedDate
      )?.id;
      // console.log(formattedDate);
      if (selectedId) {
        try {
          const response = await addFoamData(selectedId, sold, profit);
          if (response) {
            const updatedFoamData = foamData.map((item) =>
              item.id === selectedId
                ? {
                    ...item,
                    sold: response.sold,
                    percentage: response.percentage,
                  }
                : item
            );

            dispatch(setFoamData(updatedFoamData));
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
    <div className="bg-white w-full md:w-[719px] mx-auto mt-10 md:ml-[310px] md:mt-[56px] border-4 border-primary">
      <div className="text-2xl ml-4 md:ml-[30px]">Foam Data Table</div>

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
                <label className=" text-lg pt-2">Percentage:</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  value={profit}
                  className="w-[195px] h-[30px] p-2 rounded"
                  onChange={(e) => setProfit(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-lg pt-2">Sold:</label>
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

        <FoamTab />
      </div>
    </div>
  );
};
const FoamTab = () => {
  const foamData = useSelector((state) => state.foamData.foamData);
  // const startDate = useSelector((state) => state.sprint.startDate);

  const dispatch = useDispatch();
  

  useEffect(() => {
    const fetchFoamData = async () => {
      try {
        const data = await getFoamData();
        dispatch(setFoamData(data));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchFoamData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);

  const calculateSum = () => {
    let totalSold = 0;
    let totalPercentage = 0;
    let grandTotal = 0;
    if (Array.isArray(foamData)) {
      foamData.forEach((item) => {
        totalSold += parseInt(item.sold);
        totalPercentage += parseInt(item.percentage);
        grandTotal += parseInt(item.sold) - parseInt(item.percentage);
      });
    }

    return { totalSold, totalPercentage, grandTotal };
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
              Percentage
            </th>
            <th scope="col" class="px-6 py-3">
              Bnet
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(foamData) ? (
            foamData.map((item) => (
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
export default FoamDataTable;
export { FoamTab };
