// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setSprintId,
  setIsSprintActive,
  setStartDate,
} from "../store/sprintSlice";

import Cookies from "js-cookie";
import dayjs from "dayjs";
import { getExpenseData } from "../../api-helper-function/apiCallerFunction";
import { SelectedDate } from "../../api-helper-function/apiCallerFunction"; // Import your API function for sending data to the backend
import DeactivateButton from "./deactivateButton";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import { setUserId } from "../store/userId";
const StartDatePicker = () => {
  const isSprintActive = useSelector((state) => state.sprint.isSprintActive);
  const startDate = useSelector((state) => state.sprint.startDate);
  const userId = useSelector((state) => state.userId.userId);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await getExpenseData();

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
    <div className="container -mr-[50px]  ">
      <div className=" w-[6700px] h-[450px] -mt-[850px]   ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {!isSprintActive && (
              <DatePicker
                label="Start The Sprint"
                selected={startDate}
                className="border rounded w-[20px]"
                calendarClassName="w-320"
                dayClassName={() => "text-blue-500"}
                onChange={handleDateChange}
              />
            )}
            {isSprintActive && <DeactivateButton />}
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
  
  );
};

export default StartDatePicker;
