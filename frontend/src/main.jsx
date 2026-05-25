import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import useAuthStore from "./store/authStore";
import { Toaster } from "react-hot-toast";

useAuthStore.getState().checkAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>,
);

