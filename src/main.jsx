import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundry from "./components/ErrorBoundry/ErrorBoundy.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundry>
      <div style={{ background: "black", color: "white" }}>
        <App />
      </div>
    </ErrorBoundry>
  </React.StrictMode>
);
