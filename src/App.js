// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components for the routes
import RegistrationForm from "./components/auth/registration";
import UserLogin from "./components/auth/login";
import CardApp from "./components/cards/cardDisplay";
import HomePage from "./components/HomePage/homePage";
import TableComponent from "./components/tab";
import FoamDataTable from "./components/tables/foamTable";
import Report from "./components/report";
import SideBar from "./components/sideBar";
import Card from "./components/cards/backGround";
import TableDisplay from "./components/cards/tableDisplay";
import LogoutButton from "./components/logOut";
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
        <Route exact path="/:selectedCard" element={<TableDisplay />} />

        <Route exact path="/logOut" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
}

export default App;
