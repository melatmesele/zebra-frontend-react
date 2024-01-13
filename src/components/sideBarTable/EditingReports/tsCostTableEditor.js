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
            onClick={handleTsCostReportData}
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
  );
};

export default TsCostTableEditor;
