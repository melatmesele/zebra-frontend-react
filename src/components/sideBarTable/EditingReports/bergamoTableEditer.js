import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import {
  setTotalsReport,
  setPersonalExpenseReport,
  setExpenseReport,
} from "../../store/report";
import {
  addBergamoData,
  getReportData,
} from "../../../api-helper-function/apiCallerFunction";

const EditedBergamoTable = () => {
  const minDate = useSelector((state) => state.reportData.minDate);
  const maxDate = useSelector((state) => state.reportData.maxDate);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bergamod, setBergamod] = useState(0);
  const bergamoData = useSelector((state) => state.reportData.totalsReport);
  const selectedSprintId = useSelector((state) => state.reportData.sprintIdd);

  const [sold, setSold] = useState(0);
  const formatSelectedDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns 0-based month
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const dispatch = useDispatch();

  const handleBergamoReportData = async () => {
    if (selectedDate !== null) {
      // Format the selected date to match the foam data format
      const formattedDate = formatSelectedDate(selectedDate);

      // Find the corresponding ID for the selected date
      const selectedId = bergamoData.find(
        (item) => item.date === formattedDate
      )?.id;
      // console.log(formattedDate);

      if (selectedId) {
        try {
          const response = await addBergamoData(selectedId, sold, bergamod);
          // Update the foamData state with the modified data
          const updatedBergamoData = bergamoData.map((item) =>
            item.id === selectedId
              ? {
                  ...item,
                  sold: response.sold,
                  bergamod: response.bergamod,
                }
              : item
          );
          dispatch(setTotalsReport(updatedBergamoData));
          const reportData = await getReportData(selectedSprintId);

          dispatch(setPersonalExpenseReport(reportData.PersonalProfit));
          dispatch(setExpenseReport(reportData.net));
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
  useEffect(() => {
    const fetchDataForSelectedSprint = async () => {
      try {
        const reportData = await getReportData(selectedSprintId);

        dispatch(setPersonalExpenseReport(reportData.PersonalProfit));
        dispatch(setExpenseReport(reportData.net));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForSelectedSprint();
  }, [selectedSprintId, dispatch]);
  return (
    <div className="max-w-md bg-white">
      <div
        className="flex flex-row items-center justify-between space-x-4"
        action="#"
        method="POST"
      >
        <div>
          <label className="block text-lg mb-1">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border-color-rgb(203 213 225) rounded w-full h-[30px]"
            dateFormat="yyyy/MM/dd"
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        <div>
          <label className="block text-lg mb-1">Sold:</label>
          <input
            type="number"
            value={sold}
            className="w-full h-[30px] p-2 rounded"
            onChange={(e) => setSold(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-1">Bergamo:</label>
          <input
            type="number"
            value={bergamod}
            className="w-full h-[30px] p-2 rounded"
            onChange={(e) => setBergamod(e.target.value)}
          />
        </div>

        <button
          className="h-[30px] px-4 rounded bg-primary"
          onClick={handleBergamoReportData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditedBergamoTable;
