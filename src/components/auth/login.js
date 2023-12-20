import React, { useState } from "react";
import { Login } from "../../api-helper-function/apiCallerFunction";
import { useNavigate } from "react-router-dom";
const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const logdata = await Login(formData);

      if (logdata && logdata.token) {
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      // Handle any login request errors
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <div className="px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-4  text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 max-w-md mx-auto p-8 h-400 w-full bg-white rounded-lg shadow-md"
              action="#"
              method="POST"
            >
              <div className="w-100 ">
                <label htmlFor="email" className="block  text-xl text-gray-700">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border border-gray-300 py-2 text-xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
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
                    onChange={handleInputChange}
                    className={`block w-full rounded-md border ${
                      error ? "border-red-500" : "border-gray-300"
                    } py-2 text-xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-2xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleLogin}
                >
                  Sign in
                </button>
              </div>
            </form>
            <p class="text-lg font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
