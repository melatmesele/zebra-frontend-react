import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-yellow-400 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-xl">Your Logo</div>
          <ul className="flex space-x-4">
            <li><a href="/table" className="text-white  rounded-lg px-10 py-1 bg-yellow-600 ">Table</a></li>
            <li><a href="/Report" className="text-white rounded-lg px-10 py-1 bg-yellow-600">Report</a></li>
            <li><a href="/Login" className="text-white rounded-lg px-10 py-1 bg-yellow-600">login</a></li>
            <li><a href="/register" className="text-white rounded-lg px-3 py-1 bg-yellow-600">Registration</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
