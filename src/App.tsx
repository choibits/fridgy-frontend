import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GroceryList from "./pages/GroceryList";
import Refrigerator from "./pages/Refrigerator";
import Food from "./pages/Food";
import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
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
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/addgrocerylist" element={<AddGroceryList />} /> */}
        <Route path="/grocerylist/id:" element={<GroceryList />} />
        <Route path="/refrigerator/:id" element={<Refrigerator />} />
        <Route path="/refrigerator/:id/food/:id" element={<Food />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
