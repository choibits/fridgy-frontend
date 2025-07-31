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
import Login2 from "./pages/Login";
import About from "./pages/About";
import Footer from "./components/footer/Footer";
// import AddGroceryList from "./pages/AddGroceryList";
// import { useAuth } from "./context/AuthContext"; // or however you're tracking auth

// TODO: clean up code
const App = () => {
  return (
    <div>
      {/* {isLoggedIn && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/home" element={<Home />} />
        <Route path="/grocerylists" element={<GroceryLists />} />
        <Route path="/refrigerators" element={<Refrigerators />} />
        <Route path="/grocerylist/id:" element={<GroceryListDetails />} />
        <Route path="/refrigerator/:id" element={<RefrigeratorDetails />} />

        {/* TODO: Not sure about this path? */}
        <Route path="/refrigerator/:id/food/:id" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
