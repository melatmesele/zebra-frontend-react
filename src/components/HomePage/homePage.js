import React from "react";
import NavBar from "./navBar.js";
import CardApp from "../cards/cardDisplay.js";
import StartDatePicker from "../picker.js";
import TiltedEllipse from "./ellipse.js";
import BottomEllipse from "./bottomEllipse.js";
import Logo from './logo'
const HomePage = () => {
  return (
    <div className=" fixed ">

        <TiltedEllipse />
      
       
           <Logo />
          

          <CardApp />
        
        <BottomEllipse />
      </div>

  );
};

export default HomePage;
