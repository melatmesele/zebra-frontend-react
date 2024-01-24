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
    <div className="">
      <div
        className="space-y-3 flex flex-col  max-w-md mx-auto p-8 h-400 w-full bg-white "
        action="#"
        method="POST"
      >
      

        <div className="mt-[9px]">
          <div className="flex items-center justify-between">
            <label className=" text-lg pt-2">Initial Debt:</label>
          </div>
          <div className="mt-2">
            <input
              type="number"
              value={initialDebt}
              className="w-[195px] h-[30px] p-2 rounded"
              onChange={(e) => setInitialDebt(e.target.value)}
            />
           
          </div>
        </div>


        <div>
          <button
            className="ml-[105px] h-[30px] w-[90px] rounded bg-primary"
            onClick={handleInitialDebtData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialDebtEditor;
