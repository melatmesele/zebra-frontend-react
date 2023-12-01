import React, { useState } from 'react';
import {register ,getUserByEmail} from '../api-helper-function/apiCallerFunction'
const axios = require('axios');

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
   const [errors, setErrors] = useState({});

  // Update form state based on input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  function validateUserDetails() {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name  is Required";
    }
    if (!formData.email) {
      errors.email = "Email  is Required";
    }
    if (!formData.password) {
      errors.password = "Password is Required";
    }
    if (formData.password.length < 6) {
      errors.password = "Password length should be greater 6";
    }
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
const handleSubmit = (e) => {
    e.preventDefault();
    if (validateUserDetails()){
        register(
        formData
    )
    }
    
    }
    
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange}
        />
        {errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <button type="submit" >Register</button>
    </form>
  );
};

export default RegistrationForm;