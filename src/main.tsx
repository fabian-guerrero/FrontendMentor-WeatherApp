import "./styles/index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UnitsProvider } from "./context";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnitsProvider>
      <App />
    </UnitsProvider>
  </StrictMode>
);
