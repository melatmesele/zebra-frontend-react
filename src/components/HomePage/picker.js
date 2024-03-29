import { useSelector, useDispatch } from "react-redux";
import {
  setSprintId,
  setIsSprintActive,
 
} from "../store/sprintSlice";
import dayjs from "dayjs";
import { getExpenseData } from "../../api-helper-function/apiCallerFunction";
import { SelectedDate } from "../../api-helper-function/apiCallerFunction"; // Import your API function for sending data to the backend
import DeactivateButton from "./deactivateButton";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import InitialDebtForm from "./initialDebtForm"; 
// ... (your other imports)

const StartDatePicker = () => {
  const isSprintActive = useSelector((state) => state.sprint.isSprintActive);
  const startDate = useSelector((state) => state.sprint.startDate);
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        await getExpenseData();
        dispatch(setIsSprintActive(true));
      } catch (error) {
        dispatch(setIsSprintActive(false));
      }
    };

    fetchExpenseData();
  }, [dispatch]);

  async function handleDateChange(startDate) {
    const formattedDate = dayjs(startDate).format("YYYY-MM-DD");
    // const data = await SelectedDate(formattedDate);

    // dispatch(setSprintId(data.id));
    setSelectedDate(formattedDate); // Update the selected date in the state
  }

  const handleSendDateToBackend = async () => {
    try {
      if (selectedDate) {
        const data = await SelectedDate(selectedDate);
        dispatch(setSprintId(data.id));
        setSelectedDate("");
        dispatch(setIsSprintActive(true));
        setError(null);

        console.log("Date sent to the backend successfully!");
      } else {
        setError("Please select a date before sending to the backend.");
       

      }
    } catch (error) {
      setError("Error sending date to the backend: " + error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-auto">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {!isSprintActive && (
              <div className="fixed bottom-10 left-4 flex gap-2">
                <DatePicker
                  label="Select Sprint Date"
                  selected={startDate}
                  className="border rounded w-[12rem]"
                  calendarClassName="w-320"
                  dayClassName={() => "text-blue-500"}
                  onChange={handleDateChange}
                />
                <button
                  onClick={handleSendDateToBackend}
                  className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:shadow-outline"
                >
                  Start The Sprint
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            )}
            {isSprintActive && (
              <div className="w-full flex flex-row flex-wrap justify-between p-4">
                <div className="">
                  <DeactivateButton />
                </div>
                <div className="">
                  <InitialDebtForm />
                </div>
              </div>
            )}
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default StartDatePicker;

