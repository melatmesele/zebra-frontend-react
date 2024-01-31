import React, { useState } from "react";
import DatePicker from "react-datepicker";
import {
  addTsCostData,
  getReportData,
} from "../../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import {
  setTsCostReport,
  setPersonalExpenseReport,
  setExpenseReport,
} from "../../store/report";
const TsCostTableEditor = () => {
  const minDate = useSelector((state) => state.reportData.minDate);
  const maxDate = useSelector((state) => state.reportData.maxDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [cost, setCost] = useState(0);
  const tsCostData = useSelector((state) => state.reportData.tsCostsReport);
  const selectedSprintId = useSelector((state) => state.reportData.sprintIdd);

  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const dispatch = useDispatch();

  const handleTsCostReportData = async () => {
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
            dispatch(setTsCostReport(updatedTsCostData));
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
      <form
        className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2"
        action="#"
        method="POST"
      >
        <div className="w-full sm:w-auto">
          <label className="text-lg block">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border-color-rgb(203 213 225) rounded mt-2 w-full h-[30px]"
            dateFormat="yyyy/MM/dd"
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-lg block">Ts-Cost:</label>
          <input
            type="number"
            value={cost}
            className="w-full h-[30px] p-2 rounded"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>

        <div>
          <button
            className="h-[30px] w-full sm:w-auto px-4 rounded bg-primary"
            onClick={handleTsCostReportData}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );

};

export default TsCostTableEditor;
