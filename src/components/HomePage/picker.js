import { useState } from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { setSprintId, setIsSprintActive } from "../../store/sprintSlice";
import { SelectedDate } from "../../api-helper-function/apiCallerFunction"; // Import your API function for sending data to the backend
import DeactivateButton from "./deactivateButton";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const StartDatePicker = () => {
  const [startDate, setStartDate] = useState(null);
  // const [isActiveData, setIsActiveData] = useState(false);
  const isSprintActive = useSelector((state) => state.sprint.isSprintActive);
  const dispatch = useDispatch();

  async function handleDateChange(startDate) {
    setStartDate(startDate);
    const data = await SelectedDate(startDate);
    // console.log(data , "/////////////")
    dispatch(setSprintId(data.id));
    dispatch(setIsSprintActive(data.is_active));

    // setIsActiveData(true) // Call your API function to send the selected date to the backend
  }

  return (
    <div className="container -mr-[50px]  ">
      <div className=" w-[6700px] h-[450px] -mt-[850px]   ">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label="Start The Sprint"
              selected={startDate}
              className="border rounded w-[20px]"
              calendarClassName="w-320"
              dayClassName={() => "text-blue-500"}
              onChange={handleDateChange}
            />
            {isSprintActive && <DeactivateButton />}
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </div>
    // <div flex>
    //   <p>start the sprint </p>
    //   <DatePicker
    //     selected={startDate}
    //     onChange={handleDateChange}
    //     className="border p-2 rounded"
    //     label = "Select Start Date"
    //   />
    //   {isSprintActive && <DeactivateButton />}
    //       </div>
  );
};

export default StartDatePicker;
