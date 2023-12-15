import React, { useState } from "react";
import {
  register,
  getUserByEmail,
} from "../../api-helper-function/apiCallerFunction";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const RegistrationForm = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // Update form state based on input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  function validateUserDetails() {
    let errors = {};
    if (!formData.name) {
      errors.name = "Name  is Required";
    }
    if (!formData.email || checkEmailExists(formData.email)) {
      errors.email = "Unique Email  is Required";
    }
    if (!formData.password) {
      errors.password = "Password is Required";
    }
    if (formData.password.length < 6) {
      errors.password = "Password length should be greater 6";
    }
    // if (checkEmailExists(formData.email)) {

    //   errors.emails = "Email is already in use";
    // }
    //  const emailExists = await getUserByEmail(formData.email);
    // if (emailExists) {

    // setErrors({ email: "Email is already in use" });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (validateUserDetails()){
  //         const data = register(formData)
  //         if(data){
  //           navigate("/login");
  //         }
  //     }

  //     }

  // checking if the email exists
  //   // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateUserDetails()) {
      // Check if the email already exists

      // Proceed with the registration
      register(formData);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await getUserByEmail(email);
      return response.data.exists; // Assuming the API returns a boolean indicating if the email exists
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false; // Return false in case of an error
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>Name:</label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={formData.name}
    //       onChange={handleChange}
    //     />
    //     {errors.name && <div>{errors.name}</div>}
    //   </div>
    //   <div>
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={handleChange}
    //     />
    //     {errors.email && <div>{errors.email}</div>}
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={handleChange}
    //     />
    //     {errors.password && <div>{errors.password}</div>}
    //   </div>
    //   <button type="submit" >Register</button>
    // </form>
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white">
        <div className="flex min-h-full flex-1 w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Sign UP
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 max-w-md mx-auto p-8 h-400 w-full bg-white rounded-lg shadow-md"
              action="#"
              method="POST"
            >
              <div className="w-100 ">
                <label htmlFor="name" className="block  text-2xl text-gray-700">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 py-3 text-2xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.name && <div>{errors.name}</div>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block  text-2xl text-gray-700"
                  >
                    Email
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-3 text-2xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.email && <div className="">{errors.email}</div>}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block  text-2xl text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-3 text-2xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.password && <div>{errors.password}</div>}
                </div>
              </div>

              <div>
                <button
                  // type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
            <p class="text-lg font-light text-gray-500 dark:text-gray-400">
              already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-black">
        {/* Any content for the brown area goes here */}
      </div>
    </div>
  );
};

export default RegistrationForm;
