import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  addCherkData,
  getReportData,
} from "../../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import {
  setCherkReport,
  setPersonalExpenseReport,
  setExpenseReport,
} from "../../store/report";
const CherkTableEditor = () => {
    const minDate = useSelector((state) => state.reportData.minDate);
    const maxDate = useSelector((state) => state.reportData.maxDate);
    const [selectedDate, setSelectedDate] = useState(null);
    const [profit, setProfit] = useState(0);
    const [sold, setSold] = useState(0);
    const [error, setError] = useState(null);

    const cherkData = useSelector((state) => state.reportData.cherksReport);
    const selectedSprintId = useSelector((state) => state.reportData.sprintIdd);
    const formatSelectedDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const dispatch = useDispatch();

    const handleCherkReportData = async () => {
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
        } else {
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
                dispatch(setCherkReport(updatedCherkData));
                 const reportData = await getReportData(selectedSprintId);

                 dispatch(setPersonalExpenseReport(reportData.PersonalProfit));
                 dispatch(setExpenseReport(reportData.net));
              }
            } catch (error) {
              console.error("Error sending data to the backend:", error);
            }
          } else {
            console.error("No id found for the selected date");
          }
        }
      } else {
        console.error(
          "Please select a date before sending data to the backend"
        );
      }
    };



  return (
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
                onClick={handleCherkReportData}
              >
                Save
              </button>
            </div>
          </div>
        </div>
  )
}

export default CherkTableEditor