import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import './index.css';
import { SearchProvider } from "./context/Search.jsx";
import { CartProvider } from "./context/Cart.jsx";


createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />

        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);
