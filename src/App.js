// App.js
import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';


// Import your components for the routes
import RegistrationForm from "./components/auth/registration";
import UserLogin from "./components/auth/login";
import CardApp from "./components/cards/cardDisplay";
// import Table from "./components/tables/foamTable";
// import New from "./components/log";
// import Card from "./components/card";
import LogoutButton from "./components/logOut";
import HomePage from "./components/HomePage/homePage";
// import MyTable from "./components/new";
// import StartDatePicker from "./components/picker"
import TableComponent from "./components/tab";
import FoamDataTable from "./components/tables/foamTable";
import Report from "./components/report";
import SideBar from "./components/sideBar";
import Card from "./components/cards/backGround";
import TiltedEllipse from "./components/HomePage/ellipse";
import TableDisplay from "./components/cardDisplay/tableDisplay";
import { RenderSelectedTable } from "./components/cards/cardDisplay";

function App() {
  return (
    
      <Router>
        <Routes>
        
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/rotate" element={<Card />} />
        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/login" element={<UserLogin />} />
        <Route exact path="/CardApp" element={<CardApp />} />
        <Route exact path="/table" element={<TableComponent />} />
        <Route exact path="/New" element={<FoamDataTable />} />
        <Route exact path="/logout" element={<LogoutButton />} />
        <Route exact path="/report" element={<Report />} />
        <Route exact path="/sidebar" element={<SideBar />} />
        <Route exact path="/tableDisplay" element={<TableDisplay />} />
        <Route path="/dataTable/:selectedCard" element={<TableDisplay />} />
      
      
        </Routes>
        
      </Router>
   
  );
}

export default App;
