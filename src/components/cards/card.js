import React, { useState } from "react";
import CardContent from "./cardContent";
import foam from "../assets/Foam.jpg";
import textile from "../assets/textile.jpg";
import sold from "../assets/Sold.jpg";
import tsCost from "../assets/ts-cost.jpg";
import myCost from "../assets/My-cost.jpg";

const Card = ({ text }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="card-container  w-[800px] h-80 rounded overflow-hidden m-5 w-80 cursor-pointer card relative">
      <div className="relative ">
        <img
          src={
            text === "FOAM"
              ? foam
              : text === "SOLD"
              ? sold
              : text === "TS-COST"
              ? tsCost
              : text === "MY-COST"
              ? myCost
              : textile
          }
          alt="Avatar"
          className="h-full w-full object-cover rounded-medium "
        />
        <div className="absolute bottom-0  right-12 ">
          <CardContent text={text} />
        </div>
      </div>
    </div>
  );
};

export default Card;
