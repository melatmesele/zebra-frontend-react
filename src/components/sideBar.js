import React, { useState, useEffect } from "react";
import {
  getInactivateSprintData,
  getReportData,
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
} from "./store/report.js";
import ExpenseTab from "./sideBarTable/expenseTable";
import PersonalExpenseTab from "./sideBarTable/personalExpense";

import TsCostReportTable from "./sideBarTable/tsCostTable";
import CherkReportTable from "./sideBarTable/CherkTable";
import FoamSideBarTab from "./sideBarTable/FoamTable";
const Sidebar = () => {
  const [sprintData, setSprintData] = useState([]);

  const [selectedSprintId, setSelectedSprintId] = useState(null);
  const dispatch = useDispatch();

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

  //   console.log(i)

  useEffect(() => {
    const fetchDataForSelectedSprint = async () => {
     

      try {
        const reportData = await getReportData(selectedSprintId);
        dispatch(setFoamReport(reportData.foams));
        dispatch(setCherkReport(reportData.cherks));
        dispatch(setTotalsReport(reportData.totals));
        dispatch(setMyCostReport(reportData.my_costs));
        dispatch(setTsCostReport(reportData.ts_costs));
        dispatch(setPersonalExpenseReport(reportData.PersonalProfit));
        dispatch(setExpenseReport(reportData.net));
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataForSelectedSprint();
  }, [selectedSprintId, dispatch]);

  const handleDateClicked = (id) => {
    setSelectedSprintId(id);
  };
  
  const DisplayTables = () => {
    if (selectedSprintId) {
      return (
        <div className="m-5 flex flex-wrap gap-4">
          <div className="flex-auto min-w-0">
            <FoamSideBarTab />
          </div>
          <div className="flex-auto min-w-0">
            <CherkReportTable />
          </div>
          <div className="flex-auto min-w-0">
            <BergamoReportTab />
          </div>
          <div className="flex-auto min-w-0">
            <MyCostReportTable />
          </div>
          <div className="flex-auto min-w-0">
            <TsCostReportTable />
          </div>
          <div className="flex-auto min-w-0">
            <ExpenseTab />
          </div>
          <div className="flex-auto min-w-0">
            <PersonalExpenseTab />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  //   console.log("ggg",sprintData)
  return (
    <>
      <div className="flex">
        {/* Sidebar for Sprint Dates with fixed width */}
        <div className="bg-white border-r h-screen w-64 min-w-[250px] flex-shrink-0">
          {" "}
          {/* Updated classes */}
          {sprintData.map((sprint) => (
            <div key={sprint.id} className="hover:bg-gray-100">
              <button
                onClick={() => handleDateClicked(sprint.id)}
                className="w-full text-left p-2 border-b"
              >
                {sprint.startDate}
              </button>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {" "}
          {/* Adjusted margin-left */}
          <DisplayTables />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
