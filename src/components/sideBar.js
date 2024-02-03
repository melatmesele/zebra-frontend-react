import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {
  getInactivateSprintData,
  getReportData,
  downloadSprintReport
} from "../api-helper-function/apiCallerFunction";

import MyCostReportTable from "./sideBarTable/myCostTable";
import BergamoReportTab from "./sideBarTable/bergamoTable";
import {  useDispatch } from "react-redux";
import {
  setFoamReport,
  setCherkReport,
  setTotalsReport,
  setMyCostReport,
  setTsCostReport,
  setPersonalExpenseReport,
  setExpenseReport,
  setMaxDate,
  setMinDate,
  setSprintIdd,
} from "./store/report.js";
import ExpenseTab from "./sideBarTable/expenseTable";
import PersonalExpenseTab from "./sideBarTable/personalExpense";
import TsCostReportTable from "./sideBarTable/tsCostTable";
import CherkReportTable from "./sideBarTable/CherkTable";
import EditedBergamoTable from "./sideBarTable/EditingReports/bergamoTableEditer.js";
import CherkTableEditor from "./sideBarTable/EditingReports/cherkTableEditor.js";
import FoamTableEditor from "./sideBarTable/EditingReports/foamTableEditer.js";
import TsCostTableEditor from "./sideBarTable/EditingReports/tsCostTableEditor.js";
import MyCostTableEditor from "./sideBarTable/EditingReports/myCostTableEditor.js";
import InitialDebtEditor from "./sideBarTable/EditingReports/initialDebtEditor.js";
import FoamSideBarTab from "./sideBarTable/FoamTable";

const Sidebar = () => {
  const [sprintData, setSprintData] = useState([]);
  const [selectedSprintId, setSelectedSprintId] = useState(null);

  const dispatch = useDispatch();
  const [isCherkEditing, setIsCherkEditing] = useState(false);
  const [isFoamEditing, setIsFoamEditing] = useState(false);
  const [isBergamoEditing, setIsBergamoEditing] = useState(false);
  const [isMyCostEditing, setIsMyCostEditing] = useState(false);
  const [isTsCostEditing, setIsTsCostEditing] = useState(false);
  const [isInitialDebtEditing, setIsInitialDebtEditing] = useState(false);

  const handleFoamEditForm = () => {
    setIsFoamEditing(true);
  };
  const handleCherkEditForm = () => {
    setIsCherkEditing(true);
  };
  const handleBergamoEditForm = () => {
    setIsBergamoEditing(true);
  };
  const handleMyCostEditForm = () => {
    setIsMyCostEditing(true);
  };
  const handleTsCostEditForm = () => {
    setIsTsCostEditing(true);

  };
  const handleInitialDebtEditForm = () => {
    setIsInitialDebtEditing(true);
  };
  const handleFoamCancel = () => {
    setIsFoamEditing(false);
  };
  const handleCherkEditCancel = () => {
    setIsCherkEditing(false);
  };
  const handleBergamoEditCancel = () => {
    setIsBergamoEditing(false);
  };
  const handleMyCostEditCancel = () => {
    setIsMyCostEditing(false);
  };
  const handleTsCostEditCancel = () => {
    setIsTsCostEditing(false);
  };
  const handleInitialDebtEditCancel = () => {
    setIsInitialDebtEditing(false);
  };

  useEffect(() => {
    const fetchSprintData = async () => {
      try {
        // const sprint_id = foamData.sprint_id;

        const database = await getInactivateSprintData();
        const inactiveSprints = database.map((sprint) => {
          return { id: sprint.id, startDate: sprint.startDate };
        });

        setSprintData(inactiveSprints);
      } catch (error) {
        console.error("Error fetching sprint data:", error);
      }
    };

    fetchSprintData();
  }, []);


  useEffect(() => {
    const fetchDataForSelectedSprint = async () => {
     

      try {
        const reportData = await getReportData(selectedSprintId);
        const minDate = new Date(
          Math.min(...reportData.totals.map((item) => new Date(item.date)))
        );
        const maxDate = new Date(
          Math.max(...reportData.totals.map((item) => new Date(item.date)))
        );
        dispatch(setSprintIdd(selectedSprintId));

        dispatch(setMinDate(minDate));
        dispatch(setMaxDate(maxDate));
        dispatch(setFoamReport(reportData.foams));
        dispatch(setCherkReport(reportData.cherks));

        dispatch(setTotalsReport(reportData.totals));
        dispatch(setMyCostReport(reportData.my_costs));
        dispatch(setTsCostReport(reportData.ts_costs));
        dispatch(setPersonalExpenseReport(reportData.PersonalProfit));
        dispatch(setExpenseReport(reportData.net));
        // Reset editing states
        setIsFoamEditing(false);
        setIsCherkEditing(false);
        setIsBergamoEditing(false);
        setIsMyCostEditing(false);
        setIsTsCostEditing(false);
        setIsInitialDebtEditing(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForSelectedSprint();
  }, [selectedSprintId, dispatch]);

  const handleDateClicked = (id) => {
    setSelectedSprintId(id);
  };
  
  const handleDownload = async (sprintId) => {
    try {
      await downloadSprintReport(sprintId);
    } catch (error) {
      console.error("Download failed:", error);
      // Handle the error, e.g., show a notification to the user
    }
  };

  const DisplayTables = () => {
    if (selectedSprintId) {
      return (
        <>
          <div className="flex w-100 justify-end">
            <div>
              <button
                className="h-[30px] px-4 rounded bg-primary"
                onClick={() => handleDownload(selectedSprintId)}
              >
                Download
              </button>
            </div>
          </div>
          <div className="m-5 flex flex-wrap gap-4">
            <div className="flex-auto min-w-0">
              <h1>FOAM REPORT</h1>
              <div>
                { !isFoamEditing && (
                  <EditIcon
                    className="edit-icon "
                    onClick={handleFoamEditForm}
                  />
                )}
                <div className="flex flex-row justify-center items-center space-x-4 mb-4">
                  {isFoamEditing && <FoamTableEditor />}
                  {isFoamEditing && (
                    <button onClick={handleFoamCancel}>Cancel</button>
                  )}
                </div>
              </div>

              <FoamSideBarTab />
            </div>
            <div className="flex flex-col min-w-0">
              <h1>CHERK REPORT</h1>
              <div>
                {!isCherkEditing && (
                  <EditIcon
                    className="edit-icon "
                    onClick={handleCherkEditForm}
                  />
                )}
                <div className="flex flex-row justify-center items-center space-x-4 mb-4">
                  {isCherkEditing && <CherkTableEditor />}
                  {isCherkEditing && (
                    <button onClick={handleCherkEditCancel}>Cancel</button>
                  )}
                </div>
              </div>
              <CherkReportTable />
            </div>
            <div className="flex flex-col min-w-0">
              <h1>BERGAMOD REPORT</h1>
              <div>
                {!isBergamoEditing && (
                  <EditIcon
                    className="edit-icon"
                    onClick={handleBergamoEditForm}
                  />
                )}
                <div className="flex flex-row justify-center items-center space-x-4 mb-4">
                  {isBergamoEditing && <EditedBergamoTable />}
                  {isBergamoEditing && (
                    <button className="" onClick={handleBergamoEditCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <BergamoReportTab />
            </div>

            <div className="flex-auto min-w-0">
              <h1>MY COST REPORT</h1>
              <div>
                {!isMyCostEditing && (
                  <EditIcon
                    className="edit-icon "
                    onClick={handleMyCostEditForm}
                  />
                )}
                <div className="flex flex-row justify-center items-center space-x-4 mb-4">
                  {isMyCostEditing && <MyCostTableEditor />}
                  {isMyCostEditing && (
                    <button onClick={handleMyCostEditCancel}>Cancel</button>
                  )}
                </div>
              </div>

              <MyCostReportTable />
            </div>
            <div className="flex-auto min-w-0">
              <h1>T'S COST REPORT</h1>
              <div>
                {!isTsCostEditing && (
                  <EditIcon
                    className="edit-icon "
                    onClick={handleTsCostEditForm}
                  />
                )}
                <div className="flex flex-row items-center space-x-4 mb-4">
                  {isTsCostEditing && <TsCostTableEditor />}
                  {isTsCostEditing && (
                    <button onClick={handleTsCostEditCancel}>Cancel</button>
                  )}
                </div>
              </div>
              <TsCostReportTable />
            </div>
            <div className="flex-auto min-w-0">
              <div className="flex flex-col">
                <div className="flex items-center">
                  {!isInitialDebtEditing && (
                    <div className="mt-1">
                      {" "}
                      {/* Adjust the top margin if necessary */}
                      <EditIcon
                        className="edit-icon"
                        onClick={handleInitialDebtEditForm}
                      />
                    </div>
                  )}

                  <div className="flex-grow">
                    {isInitialDebtEditing && (
                      <div className="flex gap-3">
                        <InitialDebtEditor />
                        <button onClick={handleInitialDebtEditCancel}>
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <ExpenseTab />
              </div>
            </div>

            <div className="flex-auto min-w-0">
              <PersonalExpenseTab />
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="flex mt-5 overflow-auto">
        <div className="bg-white border-r h-screen w-64 min-w-[250px] flex-shrink-0">
          {" "}
          {sprintData.map((sprint) => (
            <div key={sprint.id} className="hover:bg-gray-100">
              <button
                onClick={() => handleDateClicked(sprint.id)}
                className={`w-full text-left p-2 border-b ${
                  selectedSprintId === sprint.id
                    ? "bg-primary bg-opacity-25"
                    : ""
                }`}
              >
                {sprint.startDate}
              </button>
            </div>
          ))}
        </div>
        <div className="flex-grow">
          {" "}
          <DisplayTables />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
