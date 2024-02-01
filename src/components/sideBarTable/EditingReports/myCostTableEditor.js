import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  addMyCostData,
  getReportData,
} from "../../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import {
  setMyCostReport,
  setPersonalExpenseReport,
  setExpenseReport,
} from "../../store/report";
const MyCostTableEditor = () => {
  const minDate = useSelector((state) => state.reportData.minDate);
  const maxDate = useSelector((state) => state.reportData.maxDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cost, setCost] = useState(0);
  const myCostData = useSelector((state) => state.reportData.myCostsReport);
  
  const selectedSprintId = useSelector((state) => state.reportData.sprintIdd);

  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const dispatch = useDispatch();

  const handleMyCostReportData = async () => {
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
            dispatch(setMyCostReport(updatedMyCostData));
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
    } else {
      console.error("Please select a date before sending data to the backend");
    }
  };

  return (
    <div className="max-w-md bg-white">
      <div
        className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2"
        action="#"
        method="POST"
      >
        <div className="w-full sm:w-auto">
          <label className="text-lg block">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border rounded w-full h-[30px]"
            dateFormat="yyyy/MM/dd"
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-lg block">My-Cost:</label>
          <input
            type="number"
            value={cost}
            className="w-full h-[30px] p-2 rounded"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div className="pt-2 sm:pt-0">
          <button
            className="h-[30px] w-full sm:w-auto px-4 rounded bg-primary"
            onClick={handleMyCostReportData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

};

export default MyCostTableEditor;
