// App.js
import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';


// Import your components for the routes
import RegistrationForm from './components/registration';
import UserLogin from './components/login'
import CardApp from './components/cardDisplay'
import Table from './components/table'
import New from './components/log'
import NavBar from './components/navBar';
import LogoutButton from './components/logOut';

function App() {
  return (
    
      <Router>
        <Routes>
        
          <Route exact path="/" element={<NavBar/>} />
          <Route exact path="/register" element={<RegistrationForm/>} />
          <Route exact path="/login" element={<UserLogin/>} />
          <Route exact path="/CardApp" element={<CardApp/>} />
          <Route exact path="/table" element={<Table/>} />
          <Route exact path="/New" element={<New/>} />
          <Route exact path="/logout" element={<LogoutButton/>} />
      
        </Routes>
        
      </Router>
   
  );
}

export default App;
