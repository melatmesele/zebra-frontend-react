// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components for the routes
import RegistrationForm from "./components/auth/registration";
import UserLogin from "./components/auth/login";
import CardApp from "./components/cards/cardDisplay";
import HomePage from "./components/HomePage/homePage";

import { AuthProvider } from "./index";
import SideBar from "./components/sideBar";
import TableDisplay from "./components/cards/tableDisplay";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AuthProvider>
              <HomePage />
            </AuthProvider>
          }
        />

        <Route exact path="/register" element={<RegistrationForm />} />
        <Route exact path="/" element={<UserLogin />} />
        <Route
          exact
          path="/report"
          element={
            <AuthProvider>
              <SideBar />
            </AuthProvider>
          }
        />
        <Route
          exact
          path="/:selectedCard"
          element={
            <AuthProvider>
              <TableDisplay />
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
