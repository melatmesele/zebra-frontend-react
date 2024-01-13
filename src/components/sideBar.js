import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
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
            <h1>FOAM REPORT</h1>
            <FoamSideBarTab />
            {!isFoamEditing && (
              <EditIcon className="edit-icon " onClick={handleFoamEditForm} />
            )}
            {isFoamEditing && <FoamTableEditor />}
            {isFoamEditing && (
              <button onClick={handleFoamCancel}>Cancel</button>
            )}
          </div>
          <div className="flex-auto min-w-0">
            <CherkReportTable />
            {!isCherkEditing && (
              <EditIcon className="edit-icon " onClick={handleCherkEditForm} />
            )}
            {isCherkEditing && <CherkTableEditor />}
            {isCherkEditing && (
              <button onClick={handleCherkEditCancel}>Cancel</button>
            )}
          </div>
          <div className="flex min-w-0">
            <BergamoReportTab />
            {!isBergamoEditing && (
              <EditIcon
                className="edit-icon "
                onClick={handleBergamoEditForm}
              />
            )}
            {isBergamoEditing && <EditedBergamoTable />}
            {isBergamoEditing && (
              <button onClick={handleBergamoEditCancel}>Cancel</button>
            )}
          </div>
          <div className="flex-auto min-w-0">
            <MyCostReportTable />
            {!isMyCostEditing && (
              <EditIcon className="edit-icon " onClick={handleMyCostEditForm} />
            )}
            {isMyCostEditing && <MyCostTableEditor />}
            {isMyCostEditing && (
              <button onClick={handleMyCostEditCancel}>Cancel</button>
            )}
          </div>
          <div className="flex-auto min-w-0">
            <TsCostReportTable />
            {!isTsCostEditing && (
              <EditIcon className="edit-icon " onClick={handleTsCostEditForm} />
            )}
            {isTsCostEditing && <TsCostTableEditor />}
            {isTsCostEditing && (
              <button onClick={handleTsCostEditCancel}>Cancel</button>
            )}
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
                // className="w-full text-left p-2 border-b"
                className={`w-full text-left p-2 border-b ${
                  selectedSprintId === sprint.id ? "bg-blue-200" : ""
                }`}
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
