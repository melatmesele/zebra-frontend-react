import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInitialDebtData, setTotNetData } from "../store/expense";
import {
  AddInitialDebtData,
  getExpenseData,
} from "../../api-helper-function/apiCallerFunction";
const InitialDebtForm = () => {
  const [debt, setDebt] = useState(0);

  const sprintId = useSelector((state) => state.sprint.sprintId);

  const dispatch = useDispatch();
  const handleSendData = async () => {
    const response = await AddInitialDebtData(sprintId, debt);
    dispatch(setInitialDebtData(response));
    const data = await getExpenseData();

    dispatch(setTotNetData(data.net.TotNet));
    setDebt("")

  };

  return (
    <div className="">
      <div
        className="space-y-3 flex flex-col  max-w-md mx-auto h-auto w-auto bg-white "
        action="#"
        method="POST"
      >
        <div>
          <div className="flex items-center justify-between">
            <label className="text-lg pt-2">Initial Debt:</label>
          </div>
          <div className="mt-2">
            <input
              type="number"
              value={debt}
              className="w-[195px] h-[30px] p-2 rounded"
              onChange={(e) => setDebt(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="ml-[105px] h-[30px] w-[90px] rounded bg-primary"
            onClick={handleSendData}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default InitialDebtForm;
