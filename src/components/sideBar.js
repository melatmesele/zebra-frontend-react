import React, { useState, useEffect } from "react";
import {
  getInactivateSprintData,
  getReportData,
} from "../api-helper-function/apiCallerFunction";

import MyCostReportTable from "./sideBarTable/myCostTable";
import BergamoReportTab from "./sideBarTable/bergamoTable";
import { useSelector, useDispatch } from "react-redux";
import {
  setFoamReport,
  setCherkReport,
  setTotalsReport,
  setMyCostReport,
  setTsCostReport,
} from "../store/report";
import TsCostReportTable from "./sideBarTable/tsCostTable";
import CherkReportTable from "./sideBarTable/CherkTable";
import FoamSideBarTab from "./sideBarTable/FoamTable";
const Sidebar = () => {
  const [sprintData, setSprintData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedSprintId, setSelectedSprintId] = useState(null);
  const reportData = useSelector((state) => state.reportData.reportData);
  const foamReport = useSelector((state) => state.foamReport.foamReport);
  const cherksReport = useSelector((state) => state.cherksReport.cherksReport);
  const totalsReport = useSelector((state) => state.totalsReport.totalsReport);
  const myCostsReport = useSelector(
    (state) => state.myCostsReport.myCostsReport
  );
  const tsCostsReport = useSelector(
    (state) => state.tsCostsReport.tsCostsReport
  );
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
        <div>
          <div className="flex flex-col items-center justify-center h-screen m-5">
            <div className="flex  justify-between ">
              <FoamSideBarTab />
              <div className="flex w-10"></div>
              <CherkReportTable />
              <div className="flex w-10"></div>

              <BergamoReportTab />
            </div>
            <div className="flex mt-8">
              <MyCostReportTable />
              <div className="flex w-10"></div>
              <TsCostReportTable />
            </div>
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
      {sprintData.map((sprint) => (
        <div>
          <button onClick={() => handleDateClicked(sprint.id)}>{sprint.startDate}</button>
        </div>
      ))}
      <DisplayTables />
    </>
  );
};

export default Sidebar;