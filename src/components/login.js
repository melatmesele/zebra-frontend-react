import React, { useState } from 'react';
import {Login} from '../api-helper-function/apiCallerFunction'
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin =  (e) => {
    e.preventDefault();
    Login(formData)
    
    
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default UserLogin;
