import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import { Provider } from "react-redux";
import TiltedEllipse from "./components/HomePage/ellipse";
import Logo from "./components/HomePage/logo";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="overflow-x-hidden overflow-y-hidden">
        <div className="flex flex-row space-x-4 mt-4">
          <a className="w-1/5 mr-2">
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
