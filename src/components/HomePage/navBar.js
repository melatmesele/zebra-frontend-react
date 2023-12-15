import React from "react";
const NavBar = () => {
  return (
    <div className="container  mx-auto ">
      <div className="flex justify-end  mr-[180px] items-center">
        <ul className="flex space-x-8  ">
          <li>
            <a href="/" className=" text-2xl ">
              Home
            </a>
          </li>

          <li>
            <a href="/sidebar" className=" text-2xl ">
              SideBar
            </a>
          </li>
          <li>
            <a href="/logOut" className="text-2xl ">
              LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
