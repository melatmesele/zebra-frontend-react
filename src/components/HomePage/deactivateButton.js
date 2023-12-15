import React, { useState, useEffect } from "react";
import {
  addDeactivateSprintData,
  getFoamData,
} from "../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import { setIsSprintActive } from "../../store/sprintSlice";

const DeactivateButton = () => {
  // console.log(startDate)
  //   const [deactivatemyCostData, setDeactivateData] = useState([]);
  const sprint_id = useSelector((state) => state.sprint.sprintId);
  const dispatch = useDispatch();
  const handleDeactiveSprint = async () => {
    // const formattedDate = formatSelectedDate(startDate);

    // const sprint_id = foamData.find(
    //   (item) => item.date === formattedDate
    // )?.sprint_id;

    if (sprint_id) {
      try {
        const response = await addDeactivateSprintData(sprint_id);
        if (response) {
          dispatch(setIsSprintActive(response.is_active));
        }
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    } else {
      console.error("No id found for the selected date");
    }
  };

  return (
    <div>
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={handleDeactiveSprint}
      >
        Close The Sprint
      </button>
    </div>
  );
};

export default DeactivateButton;
