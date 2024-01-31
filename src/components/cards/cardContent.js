import React from "react";

const CardContent = ({ text }) => {
  return (
    <div className=" text-md my-8 ml-5 ">
      {text === "TOTAL" ? (
        <p className="text-center text-lg font-semibold tracking-wide">
          BERGAMOD
        </p>
      ) : text === "SOLD" ? (
        <p className="text-center text-lg font-semibold tracking-wide">
          {" "}
          CHERK
        </p>
      ) : text === "TS-COST" ? (
        <p className="text-center text-lg font-semibold tracking-wide">
          T'S COST
        </p>
      ) : text === "MY-COST" ? (
        <p className="text-center text-lg font-semibold tracking-wide">
          MY COST
        </p>
      ) : (
        <p className="text-center text-lg font-semibold tracking-wide">FOAM</p>
      )}
    </div>
  );
};

export default CardContent;
