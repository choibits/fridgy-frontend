import { type JSX } from "react";
import { Link, NavLink } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <>
      <h1>Fridgy Home</h1>
      <main>
        <NavLink to="/addgrocerylist">
          <button>Create list</button>
        </NavLink>
        <br></br>

        <button>Create fridge</button>
        <h2>My Grocery Lists</h2>
        <div>
          {/* TODO: Map through grocery lists and display them */}
          <Link to={"/grocerylists/:id"}>
            <p>List 1</p>
          </Link>
        </div>

        {/* TODO: Map through refrigerators and display them */}
        <h2>My Refrigerators</h2>
        <Link to={"/refrigerators"}>
          <p>Ref 1</p>
        </Link>
      </main>
    </>
  );
};

export default Home;
