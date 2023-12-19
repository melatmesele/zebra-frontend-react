import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./components/store/store";
import { Provider, useDispatch } from "react-redux";
import TiltedEllipse from "./components/HomePage/ellipse";
import Logo from "./components/HomePage/logo";
import {useNavigate} from "react-router-dom";

export const AuthProvider = ({ children}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    dispatch(setToken(token));
  });

  return <>{children}</>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="overflow-x-hidden">
        <div className="flex flex-row space-x-4 mt-4">
          <a href="/homePage" className="w-1/5 mr-2">
            <Logo />
          </a>
          <TiltedEllipse />
        </div>
        <App />
      </div>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
