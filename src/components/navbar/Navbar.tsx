import { type JSX, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

// TODO:
/* Your application’s name or logo.
Conditional Buttons: The buttons displayed must change based on the user’s authentication status.
If Logged Out: The navbar must show a “Login” button and a “Sign Up” button.
If Logged In: The “Login” and “Sign Up” buttons must be hidden. Instead, a single button like “Go to Dashboard” or “Open App” should be displayed, allowing the user to enter the main part of your application. */

const Navbar = (): JSX.Element => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    // TODO: Home should only be visible to logged in users??
    <nav className={styles.nav}>
      <ul className={styles.linkList}>
        {isLoggedIn && (
          <li className={styles.navLink}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? styles.active : styles.navLink
              }
            >
              Home
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.active : styles.navLink
            }
          >
            About
          </NavLink>
        </li>
      </ul>

      <div>
        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
