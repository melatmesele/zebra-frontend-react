import React, { useState } from "react";
import {
  register,
} from "../../api-helper-function/apiCallerFunction";
import { useNavigate } from "react-router-dom";


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
  const [emailErrors, setEmailErrors] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState(null);

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
    if (!formData.email) {
      errors.email = "Unique Email  is Required";
    }

    if (formData.password.length < 6) {
      errors.password = "Password length should be greater 6";
    }

    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateUserDetails()) {
    
      try {
        const data = await register(formData);
        if (data && data.status === true) {
          navigate("/");
        } else {
          // Handle registration failure, show error message, etc.
          setEmailErrors(data.message);
        }
      } catch (error) {
        // Handle the error from the backend (e.g., display error message to the user)
        console.error("Registration error:", error.message);
        setEmailErrors(error.message);
      }
    }
  };

  return (

    <div className="flex justify-center overflow-x-hidden">
      <div className="w-full">
        <div className="px-6  lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign UP
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 max-w-md mx-auto p-8 h-400 w-full bg-white rounded-lg shadow-md"
              action="#"
              method="POST"
            >
              <div className="w-100 ">
                <label htmlFor="name" className="block  text-xl text-gray-700">
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
                    className="block w-full rounded-md border-gray-300 py-2 text-xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="block  text-xl text-gray-700"
                  >
                    email
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
                    className="block w-full rounded-md border-gray-300 py-2 text-xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                  {emailErrors && (
                    <p className="text-red-500 text-sm">{emailErrors}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block  text-xl text-gray-700"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-2 text-xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full bg-primary justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                >
                  Sign up
                </button>
              </div>
            </form>
            <p class="text-lg font-light text-gray-500 dark:text-gray-400">
              Already have an account yet?{" "}
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
    </div>
  );
};

export default RegistrationForm;
