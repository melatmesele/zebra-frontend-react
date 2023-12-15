import React from 'react';

const CardContent = ({ text }) => {
  return (
    <div className=" text-md my-8 ml-5 ">
      {text === "TEXTILE" ? (
        <p>this table shows bergamo </p>
      ) : text === "SOLD" ? (
        <p> this tables shows sold cherks</p>
      ) : text === "TS-COST" ? (
        <p>this table shows ts costs</p>
      ) : text === "MY-COST" ? (
        <p>this table shows my cost</p>
      ) : (
        <p>this table shows foam</p>
      )}
    </div>
  );
};

export default CardContent;
