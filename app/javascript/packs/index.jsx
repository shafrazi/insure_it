import React from "react";
import ReactDOM from "react-dom";
import { InsurancePoliciesContextProvider } from "./InsurancePoliciesContext";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <InsurancePoliciesContextProvider>
      <Router>
        <App />
      </Router>
    </InsurancePoliciesContextProvider>,
    document.body.appendChild(document.createElement("div"))
  );
});
