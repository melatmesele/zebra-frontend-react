import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setToken, setIsLoggedIn } from "../store/loginSlice"; // Update with correct path
import { Logout } from "../../api-helper-function/apiCallerFunction"; // Update with correct path

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
    <div className="fixed top-0 right-0 z-50">
      <div className="flex justify-end mr-8 md:mr-[69px] items-center">
        <ul className="flex space-x-4 justify-end sm:space-x-8 text-md sm:text-2xl">
          <li className={isActive("/") ? "border-primary border-b-2" : ""}>
            <a href="/">Home</a>
          </li>
          <li
            className={isActive("/report") ? "border-primary border-b-2" : ""}
          >
            <a href="/report">Report</a>
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
