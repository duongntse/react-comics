import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App-2";
import reportWebVitals from "./reportWebVitals";
// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./semantic-dist/semantic.min.css";
import { BrowserRouter as Router } from "react-router-dom";

// import moment from "moment";
// import twix from "twix";
// require("twix");
// require("moment-precise-range-plugin");

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
