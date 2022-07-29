import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import dotenv from "dotenv";
import App from "./App";
// dotenv.config();

// localStorage.setItem("cart", localStorage.getItem("cart"));

if (!localStorage) localStorage.setItem("products", JSON.stringify([]));

if (!localStorage) localStorage.setItem("favProducts", JSON.stringify([]));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
