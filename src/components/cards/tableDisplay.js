import React from "react";
import { RenderSelectedTable } from "./cardDisplay";
const TableDisplay = () => {
  return (
    <div className="fixed overflow-hidden">
      <RenderSelectedTable />
    </div>
  );
};

export default TableDisplay;
