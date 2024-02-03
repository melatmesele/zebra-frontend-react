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

  async function handleDateChange(startDate){
    const formattedDate = dayjs(startDate).format("YYYY-MM-DD");
    // const data = await SelectedDate(formattedDate);

    // dispatch(setSprintId(data.id));
    setSelectedDate(formattedDate); // Update the selected date in the state
  };

  const handleSendDateToBackend = async () => {
    // Check if a date is selected before sending to the backend
    if (selectedDate) {
      try {
        // Call your API function to send the selected date to the backend
        const data = await SelectedDate(selectedDate);

        
        dispatch(setSprintId(data.id));

        // Optionally, you can perform additional actions after sending the date
        console.log("Date sent to the backend successfully!");
      } catch (error) {
        console.error("Error sending date to the backend:", error);
      }
    } else {
      console.warn("Please select a date before sending to the backend.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-auto">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {!isSprintActive && (
              <div className="fixed bottom-10 left-4">
                <DatePicker
                  label="Select The Sprint Date"
                  selected={startDate}
                  className="border rounded w-[12rem]"
                  calendarClassName="w-320"
                  dayClassName={() => "text-blue-500"}
                  onChange={handleDateChange}
                />
                <button onClick={handleSendDateToBackend}>
                  Start The Sprint
                </button>
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

