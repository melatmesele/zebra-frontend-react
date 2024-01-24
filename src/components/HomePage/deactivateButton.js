import React, { useState, useEffect } from "react";
import {
  addDeactivateSprintData,
  getCherkData,
} from "../../api-helper-function/apiCallerFunction";
import { useSelector, useDispatch } from "react-redux";
import { setIsSprintActive } from "../store/sprintSlice";
import { setSprintId } from "../store/sprintSlice";
import { setFoamData } from "../store/foamSlice";
import { setBnetData ,setSnetData , setTotNetData,setInitialDebtData, setStartDateExpense,setEndDateExpense} from "../store/expense";
import { setMyCostExpense ,setMyProfitExpense,setNetProfitExpense,setStartDateExpenses,setEndDateExpenses} from "../store/personalExpense";
import { setCherkData } from "../store/cherkSlice";
import { setBergamoData } from "../store/bergamo";
import { setSpent } from "../store/cost";
import { setTsCostSpent } from "../store/tsCostSlice";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
const DeactivateButton = () => {
  const sprint_id = useSelector((state) => state.sprint.sprintId);
  const startDate = useSelector((state) => state.personalExpense.startDate);
  const endDate = useSelector((state) => state.personalExpense.endDate);
  const [open, setOpen] = useState(false);
  const handleSprint = () => {
    setOpen(true);
  };

  const Example = ({ onCancelClick }) => {
    const [open, setOpen] = useState(true);

    const cancelButtonRef = useRef(null);

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate Sprint
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate The Sprint? This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeactiveSprint}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  const handleCancelClick = () => {
    setOpen(false);
  };
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

    fetchCherkData();
  }, [dispatch]);

  // handles Deactivating the sprint
  const handleDeactiveSprint = async () => {
    if (sprint_id) {
      try {
        await addDeactivateSprintData(sprint_id);

        dispatch(setIsSprintActive(false));
        dispatch(setFoamData([]));
        dispatch(setCherkData([]));
        dispatch(setBergamoData([]));
        dispatch(setSpent([]));
        dispatch(setTsCostSpent([]));
        dispatch(setMyCostExpense(0));
        dispatch(setMyProfitExpense(0));
        dispatch(setNetProfitExpense(0));
        // dispatch(setStartDateExpenses(startDate));
        // dispatch(setEndDateExpenses(endDate));
        dispatch(setBnetData(0));
        dispatch(setSnetData(0));
        dispatch(setTotNetData(0));
        // dispatch(setStartDateExpense(""));
        // dispatch(setEndDateExpense(""));


        // dispatch(setInitialDebtData(""));










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
        onClick={handleSprint}
      >
        Close The Sprint
      </button>
      {open && <Example onCancelClick={handleCancelClick} />}
    </div>
  );
};

export default DeactivateButton;
