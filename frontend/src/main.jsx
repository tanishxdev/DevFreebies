import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />

    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: "88px", // pushes below navbar
        right: "20px", // gives breathing space from edge
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#0b1220",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: "14px 18px",
          fontSize: "14px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "#0b1220",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#0b1220",
          },
        },
      }}
    />
  </React.StrictMode>
);
