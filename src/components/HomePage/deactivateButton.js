import React, { useState, useEffect } from "react";
import {
  addDeactivateSprintData,
  getCherkData,
} from "../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import { setIsSprintActive } from "../store/sprintSlice";
import { setSprintId } from "../store/sprintSlice";
const DeactivateButton = () => {
  const sprint_id = useSelector((state) => state.sprint.sprintId);
  const isSprintActive = useSelector((state) => state.sprint.isSprintActive);
  const userId = useSelector((state) => state.userId.userId);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCherkData = async () => {
      try {
        const data = await getCherkData();
        dispatch(setSprintId(data[0].sprint_id));
      } catch (error) {
        console.error("Error fetching cost data:", error);
      }
    };

    fetchCherkData(); // Call the asynchronous action inside useEffect
  }, [dispatch]);
  const handleDeactiveSprint = async () => {

    if (sprint_id) {
      try {
        const response = await addDeactivateSprintData(sprint_id);

        dispatch(setIsSprintActive(false));

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
