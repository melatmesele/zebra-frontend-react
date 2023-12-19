import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Logout} from '../../api-helper-function/apiCallerFunction'
import { useSelector, useDispatch } from "react-redux";
import {setIsLoggedIn, setToken} from '../store/loginSlice'
const LogoutButton = () => {
 const dispatch = useDispatch()
  
  const navigate = useNavigate();
  const token = useSelector((state) => state.isLoggedIn.token);



  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    dispatch(setIsLoggedIn(!!token));
  }, [dispatch]);

 
const handleLogout = async () => {
  try {
    const logdata = await Logout();
    if (logdata) {
      localStorage.removeItem("token"); 
      dispatch(setToken(null))
      navigate("/login");
    } else {
      // Handle logout failure
    }
  } catch (error) {
    // Handle any errors
  }
};



  return (
    <div>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        navigate('/login')
        
      )}
    </div>
  );
};

export default LogoutButton;
