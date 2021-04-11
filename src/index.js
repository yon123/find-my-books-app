import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Library from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Library />
  </StrictMode>,
  rootElement
);
