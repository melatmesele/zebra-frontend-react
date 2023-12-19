import React, { useState, useEffect } from "react";
const NavBar = () => {

  return (
    <div className="container  ">
      <div className="flex justify-end mr-8 md:mr-[69px] items-center">
        <ul className="flex space-x-4 justify-end sm:space-x-8 text-md sm:text-2xl ">
          <div className="border-primary border-b-2">
            <a href="/">Home</a>
          </div>

          <li>
            <a href="/report" className="  ">
              Report
            </a>
          </li>
          <li>
            <a href="/logOut" className=" ">
              LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
