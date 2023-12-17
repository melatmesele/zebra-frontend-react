import React from "react";
import foam from "../../assets/Foam.jpg";
import textile from "../../assets/textile.jpg";
import sold from "../../assets/Sold.jpg";
import tsCost from "../../assets/ts-cost.jpg";
import myCost from "../../assets/My-cost.jpg";
import CardContent from "./cardContent";
const Card = ({ text }) => {
  return (
    <div className="flex justify-center self-center my-4">
      <div className="w-[200px] h-[140px] bg-primary-gray rounded-lg">
        <div className="flex justify-center">
          <div className="h-20 w-20 -mt-6">
            <img
              className="transform h-full w-full rounded-lg object-cover flex justify-center"
              src={
                text === "TOTAL"
                  ? textile
                  : text === "SOLD"
                  ? sold
                  : text === "TS-COST"
                  ? tsCost
                  : text === "MY-COST"
                  ? myCost
                  : foam
              }
              alt=""
            />
          </div>
        </div>
        <CardContent text={text} />
      </div>
    </div>
  );
};

export default Card;

