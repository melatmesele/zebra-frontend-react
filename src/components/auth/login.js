import React, { useState } from "react";
import { Login } from "../../api-helper-function/apiCallerFunction";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Login(formData);
    navigate("/");
  };

  return (
    // <div className="flex h-screen">
    //   <section className="w-1/2 bg-white-500"></section>

    //   <div className="bg-gray-50 dark:bg-gray-900 justify-center items-center h-1/2 space-y-4 md:space-y-6 sm:p-8">
    //     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //       Sign in to your account
    //     </h1>
    //     <form className="space-y-4 md:space-y-6" action="#">
    //       <div>
    //         <label
    //           for="email"
    //           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         >
    //           Your email
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           placeholder="name@gmail.com"
    //           value={formData.email}
    //           onChange={handleInputChange}
    //           required=""
    //         />
    //       </div>
    //       <div>
    //         <label
    //           for="password"
    //           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         >
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="••••••••"
    //           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           value={formData.password}
    //           onChange={handleInputChange}
    //           required=""
    //         />
    //       </div>
    //       <div class="flex items-center justify-between">
    //         <a
    //           href="#"
    //           className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
    //         >
    //           Forgot password?
    //         </a>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //         onClick={handleLogin}
    //       >
    //         Sign in
    //       </button>
    //       <p class="text-sm font-light text-gray-500 dark:text-gray-400">
    //         Don’t have an account yet?{" "}
    //         <a
    //           href="#"
    //           className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //         >
    //           Sign up
    //         </a>
    //       </p>
    //     </form>
    //   </div>

    //   <div className="w-1/2 bg-yellow-500"></div>
    // </div>
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-white">
        <div className="flex min-h-full flex-1 w-full flex-col justify-center items-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6 max-w-md mx-auto p-8 h-400 w-full bg-white rounded-lg shadow-md"
              action="#"
              method="POST"
            >
              <div className="w-100 ">
                <label
                  htmlFor="email"
                  className="block  text-2xl text-gray-700"
                >
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
                    className="block w-full rounded-md border-gray-300 py-3 text-2xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
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
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 py-3 text-2xl text-gray-900 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
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
      <div className="w-1/2 bg-black">
        {/* Any content for the brown area goes here */}
      </div>
    </div>
  );
};

export default UserLogin;
