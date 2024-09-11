import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./AppRouter.jsx";
import "./styles/index.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);
