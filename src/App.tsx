import Navbar from "./components/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
import Profile from "./pages/Profile";
import Footer from "./components/footer/Footer";
import { AuthContext } from "./context/AuthContext";
import { useState, useEffect } from "react";
import type { AuthResponse } from "./types";
import { getAuthData } from "./utils/localStorageUtil";
import {Text} from "@chakra-ui/react"

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  // Whever we go to any page we want to make sure the page is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = getAuthData();
    console.log(localStorageData);

    // if (localStorageData && localStorageData.token);
    if (
      localStorageData?.token &&
      localStorageData?.id &&
      localStorageData?.email
    ) {
      // nullish coalescing operator
      setIsAuthenticated(true);
      setAuthData(localStorageData);
    }
    setIsLoading(false);
  }, []);

  // another use Effect for whenever the isLoading changes
  useEffect(() => {
    if (!isLoading) {
      // need the is loading is false so that
      const isAllowedPage =
        location.pathname === "/auth/signup" ||
        location.pathname === "/auth/login" ||
        location.pathname === "/";

      // user not authenticated and not on the auth page
      // navigate away
      console.log(`Globally allowed page: ${isAllowedPage}, User is authenticated: ${isAuthenticated}`);
      if (!isAllowedPage && !isAuthenticated) {
        navigate("/auth/login");
      }
      // if you have something in the useEffect it should be a dependency
    }
  }, [isLoading, isAuthenticated, location]);

  if (isLoading) {
    return<Text>isLoading...</Text>
  }

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
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/grocerylists" element={<GroceryLists />} />
          <Route path="/refrigerators" element={<Refrigerators />} />
          <Route path="/profile" element={<Profile />} />
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
