// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components for the routes
import RegistrationForm from "./components/auth/registration";
import UserLogin from "./components/auth/login";
import CardApp from "./components/cards/cardDisplay";
import HomePage from "./components/HomePage/homePage";


import SideBar from "./components/sideBar";
import Card from "./components/cards/backGround";
import TableDisplay from "./components/cards/tableDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/homePage" element={<HomePage />} />

        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/" element={<UserLogin />} />
        <Route exact path="/sidebar" element={<SideBar />} />
        <Route exact path="/:selectedCard" element={<TableDisplay />} />

        
      </Routes>
    </Router>
  );
}

export default App;
