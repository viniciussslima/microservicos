import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/Auth";
import Router from "./Router";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
