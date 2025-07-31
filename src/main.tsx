import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "@/components/ui/provider";

// TODO: can add my own theme later

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
        <Provider>
          <App />
        </Provider>
    </StrictMode>
  </BrowserRouter>
);
