import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import { SettingsProvider } from "./context/SettingsContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>
);