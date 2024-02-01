import React ,{useEffect}from "react";
import Card from "./backGround";
import FoamDataTable from "../tables/foamTable";
import CherkDataTable from "../tables/cherkTable";
import MyCostDataTable from "../tables/myCostTable";
import TsCostDataTable from "../tables/tsCostTable";
import {  useDispatch } from "react-redux";
import { setSelectedData } from "../store/selectedCard";
import BergamoDataTable from "../tables/bergamoTable";
import { useParams, useNavigate } from "react-router-dom";

// ... (imports)

const CardApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleCardClick = (card) => {
    dispatch(setSelectedData(card));
    // Navigate to the appropriate route based on the selected card
    if (card === "FOAM") {
      navigate(`/FOAM`);
    } else if (card === "SOLD") {
      navigate(`/SOLD`);
    } else if (card === "TOTAL") {
      navigate(`/TOTAL`);
    } else if (card === "TOTAL") {
      navigate(`/TOTAL`);
    } else if (card === "TS-COST") {
      navigate(`/TS-COST`);
    }else{
      navigate(`/MY-COST`);

    }

    // Add similar conditions for other cards if needed
  };

  const cardContents = ["FOAM", "TOTAL", "SOLD", "MY-COST", "TS-COST"];

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {cardContents.slice(0, 3).map((content, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(content)}
              className="flex-shrink-0"
            >
              <Card text={content} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {cardContents.slice(3).map((content, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(content)}
              className="flex-shrink-0"
            >
              <Card text={content} />
            </div>
          ))}
        </div>
        <RenderSelectedTable />
      </div>
    </div>
  );
};



// ... (imports)

const RenderSelectedTable = () => {
  const { selectedCard } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("RenderSelectedTable component mounted");

    return () => {
      console.log("RenderSelectedTable component unmounted");
      dispatch(setSelectedData(null)); // Clear selected data when component unmounts
    };
  }, [dispatch]);

  // Render the appropriate table based on selectedCard
  const renderSelectedTable = () => {
    switch (selectedCard) {
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
        return null;
    }
  };

  return (
    <div>
      {renderSelectedTable()}
    </div>
  );
};


export default CardApp;
export { RenderSelectedTable };
