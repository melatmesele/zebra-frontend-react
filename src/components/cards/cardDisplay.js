import React, { useState } from "react";
import Card from "./backGround";
import FoamDataTable from "../tables/foamTable";
import CherkDataTable from "../tables/cherkTable";
import MyCostDataTable from "../tables/myCostTable";
import TsCostDataTable from "../tables/tsCostTable";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedData } from "../store/selectedCard";
import TableDisplay from "./tableDisplay";
import BergamoDataTable from "../tables/bergamoTable";
import { useNavigate } from "react-router-dom";
const CardApp = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const selectedData = useSelector((state) => state.selectedData.selectedData);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    dispatch(setSelectedData(card));
    navigate(`/${card}`);
  };

  const cardContents = ["FOAM", "TOTAL", "SOLD", "MY-COST", "TS-COST"];
  return (
    <div>
      <div className="flex flex-col items-center -mt-[65px] justify-center h-screen ">
        <div className="flex space-x-6 -mb-10">
          {cardContents.slice(0, 3).map((content, index) => (
            <div key={index} onClick={() => handleCardClick(content)}>
              <Card text={content} />
            </div>
          ))}
        </div>
        <div className="flex space-x-6 -mt-[75px] ">
          {cardContents.slice(3).map((content, index) => (
            <div key={index} onClick={() => handleCardClick(content)}>
              <Card text={content} />
            </div>
          ))}
        </div>
        {selectedCard && <TableDisplay />};
      </div>
    </div>
  );
};
const RenderSelectedTable = () => {
  const selectedData = useSelector((state) => state.selectedData.selectedData);

  switch (selectedData) {
    case "FOAM":
      return <FoamDataTable />;

    case "SOLD":
      return <CherkDataTable />;
    case "MY-COST":
      return <MyCostDataTable />;
    case "TS-COST":
      return <TsCostDataTable />;
    case "TOTAL":
      return <BergamoDataTable />;
    default:
      return;
  }
};

export default CardApp;
export { RenderSelectedTable };
