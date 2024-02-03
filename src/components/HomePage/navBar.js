import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom"; // Import Link here
import { useDispatch } from "react-redux";
import { setToken, setIsLoggedIn } from "../store/loginSlice"; // Update with correct path
import { Logout } from "../../api-helper-function/apiCallerFunction"; // Update with correct path
import Logo from "./logo"; // Ensure this import path is correct

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await Logout();
      localStorage.removeItem("token");
      dispatch(setToken(null));
      dispatch(setIsLoggedIn(false));
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full fixed top-0 right-0 z-50">
      <div className="flex justify-end mr-8 md:mr-[69px] items-center justify-between">
        <div className="flex flex-row space-x-4 mt-4">
          <Link to="/" className="w-1/5 mr-2">
            {" "}
            {/* Use Link here */}
            <Logo />
          </Link>
        </div>
        <ul className="flex space-x-4 justify-end sm:space-x-8 text-md sm:text-2xl">
          <li className={isActive("/") ? "border-primary border-b-2" : ""}>
            <a href="/">Home</a>{" "}
            {/* Consider changing these to <Link> as well for SPA behavior */}
          </li>
          <li
            className={isActive("/report") ? "border-primary border-b-2" : ""}
          >
            <a href="/report">Report</a>{" "}
            {/* Consider changing these to <Link> as well */}
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
