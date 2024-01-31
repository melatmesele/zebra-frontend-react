import React from "react";

const CardContent = ({ text }) => {
  return (
    <div className=" text-md my-8 ml-5 ">
      {text === "TOTAL" ? (
        <p> Recond table for recording total costs</p>
      ) : text === "SOLD" ? (
        <p> Records table for Cherk sold</p>
      ) : text === "TS-COST" ? (
        <p>T's cost record table</p>
      ) : text === "MY-COST" ? (
        <p>Personal cost record table</p>
      ) : (
        <p>Record Foams sold over the past 10 days</p>
      )}
    </div>
  );
};

export default CardContent;
