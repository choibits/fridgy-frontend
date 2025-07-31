import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GroceryLists from "./pages/GroceryLists";
import Refrigerators from "./pages/Refrigerators";
import GroceryListDetails from "./pages/GroceryListDetails";
import RefrigeratorDetails from "./pages/RefrigeratorDetails";
import ItemDetails from "./pages/ItemDetails";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Footer from "./components/footer/Footer";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";
import type { AuthResponse } from "./types";
import { getAuthData } from "./utils/localStorageUtil";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  // Whever we go to any page we want to make sure the page is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const localStorageData = getAuthData();
    console.log(localStorageData);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuthenticated,
          setIsAuthenticated,
          isLoading,
          authData,
          setAuthData,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/grocerylists" element={<GroceryLists />} />
          <Route path="/refrigerators" element={<Refrigerators />} />
          <Route path="/grocerylist/id:" element={<GroceryListDetails />} />
          <Route path="/refrigerator/:id" element={<RefrigeratorDetails />} />

          {/* TODO: Not sure about this path? */}
          <Route path="/refrigerator/:id/food/:id" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </>
  );
};

export default App;
