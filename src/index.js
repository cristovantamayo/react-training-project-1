import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles/global-style.css";

import { Home } from "./templates/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
