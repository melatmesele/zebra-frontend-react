import React, { useState, useEffect } from "react";
import {
  getFoamData,
  addFoamData,
} from "../../api-helper-function/apiCallerFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setFoamData } from "../../store/foamSlice";
const FoamDataTable = () => {
  // const [foamData, setFoamData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [profit, setProfit] = useState(0);
  const [sold, setSold] = useState(0);
  // const sprint_id = useSelector((state) => state.sprint.sprintId);
  const foamData = useSelector((state) => state.foamData.foamData);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchFoamData = async () => {
  //     try {
  //       const data = await getFoamData();
  //       dispatch(setGetFoamData(data));

  //     } catch (error) {
  //       console.error("Error fetching foam data:", error);
  //     }
  //   };

  //   fetchFoamData();
  // }, []);
  // useEffect(() => {
  //   dispatch(fetchFoamData());
  // }, [dispatch]);
  // Function to format the date as "year/month/date"
  // const formatSelectedDate = (date) => {
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
  //   const day = date.getDate().toString().padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };
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
          // if (selectedId) {
          //   try {
          //       // dispatch(setUpdateFoamData({ selectedId, sold, percentage }));
          //       dispatch(addFoamData({ id: selectedId, sold, profit }));
          //     //  );
          //     // // Update the foamData state with the modified data
          //     // const updatedFoamData = foamData.map((item) =>
          //     //   item.id === selectedId
          //     //     ? {
          //     //         ...item,
          //     //         sold: response.sold,
          //     //         percentage: response.percentage,
          //     //       }
          //     //     : item
          //     // );
          //     // setFoamData(updatedFoamData);
          //     // console.log(foamData);
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
      <FoamTab />
      <form
        className="space-y-6 flex  max-w-md mx-auto p-8 h-400 w-full bg-white rounded-lg shadow-md"
        action="#"
        method="POST"
      >
        <div className="w-100  ">
          <label htmlFor="email" className="">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border-color-rgb(203 213 225) p-2 rounded "
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div class="relative w-full min-w-[200px] h-10">
          <input
            class="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-purple-500"
            placeholder=" "
          />
          <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-purple-500 before:border-blue-gray-200 peer-focus:before:!border-purple-500 after:border-blue-gray-200 peer-focus:after:!border-purple-500">
            Input Purple
          </label>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block  text-2xl text-gray-700">percentage:</label>
          </div>
          <div className="mt-2">
            <input
              type="number"
              value={profit}
              className="w-[100px] h-[50px]"
              onChange={(e) => setProfit(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="block  text-2xl text-gray-700">Sold:</label>
          </div>
          <div className="mt-2">
            <input
              type="number"
              value={sold}
              className="w-[100px] h-[50px]"
              onChange={(e) => setSold(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button onClick={handleSendData}>Save</button>
        </div>
      </form>
    </div>
  );
};
const FoamTab = () => {
  const foamData = useSelector((state) => state.foamData.foamData);
  const dispatch = useDispatch();

  // dispatch(addFoamDataAsync( ));

  // const foamData = useSelector((state) => state.getFoamData.getFoamData);
  // const getupdateFoamData = useSelector(
  //   (state) => state.updateFoamData.updateFoamData
  // );
  // console.log(".................")
  // console.log(foamData)
  // const [getUpdateFoamData, setGetUpdateFoamData] = useState([]);
  //  useEffect(() => {
  //    dispatch(fetchFoamData());
  //  }, [dispatch]);

  //  const newdata = foamData.find(
  //    (item) => item.id === getupdateFoamData.id
  //  );
  //  console.log("/////////////////")
  //  console.log(foamData)
  //  newdata.sold = getupdateFoamData.sold;
  //  newdata.percentage = getupdateFoamData.percentage;
  //  // Merge the fetched data with the updated data
  //  dispatch(setGetFoamData(newdata)); // Dispatch the action to set the foam data including the changed data
  //  // Return the merged data

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

    // foamData.forEach((item) => {
    //   totalSold += parseInt(item.sold);
    //   totalPercentage += parseInt(item.percentage);
    //   grandTotal += parseInt(item.sold) - parseInt(item.percentage);
    // });

    // return { totalSold, totalPercentage, grandTotal };
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
      <h2>Foam Data Table</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
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
export default FoamDataTable;
export { FoamTab };
