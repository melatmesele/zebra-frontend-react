import React, { useState } from "react";

import {
  AddInitialDebtData,
  getReportData,
} from "../../../api-helper-function/apiCallerFunction.js";
import { useSelector, useDispatch } from "react-redux";
import {
 
  setExpenseReport,
} from "../../store/report";
const InitialDebtEditor = () => {
  
  const [initialDebt, setInitialDebt] = useState(0);
  const selectedSprintId = useSelector((state) => state.reportData.sprintIdd);

  const dispatch = useDispatch();

  const handleInitialDebtData = async () => {
          try {
            
            const response = await AddInitialDebtData(
              selectedSprintId,
              initialDebt
            );
            if (response) {
                const reportData = await getReportData(selectedSprintId);

                dispatch(setExpenseReport(reportData.net));

            }
            
          } catch (error) {
            console.error("Error sending data to the backend:", error);
          }
        }
  return (
    <div className="max-w-md bg-white">
      <div className="flex items-center space-x-3" action="#" method="POST">
        <label className="text-lg pt-2">Initial Debt:</label>
        <input
          type="number"
          value={initialDebt}
          className="w-[195px] h-[30px] p-2 rounded"
          onChange={(e) => setInitialDebt(e.target.value)}
        />
        <button
          className="h-[30px] w-[90px] rounded bg-primary"
          onClick={handleInitialDebtData}
        >
          Save
        </button>
      </div>
    </div>
  );

};

export default InitialDebtEditor;
