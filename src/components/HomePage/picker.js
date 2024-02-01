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
import {  useEffect } from "react";
import InitialDebtForm from "./initialDebtForm"; 
const StartDatePicker = () => {
  const isSprintActive = useSelector((state) => state.sprint.isSprintActive);
  const startDate = useSelector((state) => state.sprint.startDate);


  const dispatch = useDispatch();
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        await getExpenseData();


        dispatch(setIsSprintActive(true)); // Set isSprintActive to true if data is truthy
        // Set isSprintActive to false if data is falsy
      } catch (error) {
        dispatch(setIsSprintActive(false));
      }
    };

    fetchExpenseData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);


  async function handleDateChange(startDate) {
    const formattedDate = dayjs(startDate).format("YYYY-MM-DD");
    const data = await SelectedDate(formattedDate);

    dispatch(setSprintId(data.id));
  }

  return (
    <div className="container">
      <div className=" w-auto h-auto ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {!isSprintActive && (
              <div className=" fixed bottom-20 left-4">
                <DatePicker
                  label="Start The Sprint"
                  selected={startDate}
                  className="border rounded w-[12rem]"
                  calendarClassName="w-320"
                  dayClassName={() => "text-blue-500"}
                  onChange={handleDateChange}
                />
              </div>
            )}
            {isSprintActive && (
              <div>
                <div className="fixed right-2 top-20">
                  <InitialDebtForm />
                </div>

                <div className="fixed bottom-4 left-4">
                  <DeactivateButton />
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
