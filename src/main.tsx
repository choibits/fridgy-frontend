import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "@/components/ui/provider";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Provider> // TODO: can add my own theme later
          <App />
        </Provider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
