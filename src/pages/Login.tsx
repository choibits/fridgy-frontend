import { type JSX, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/index";
import { AuthContext } from "../context/AuthContext";

const Login = (): JSX.Element => {
  // ==== CONTEXT ====
  const { login } = useContext(AuthContext);

  // ==== STATE & CONSTANTS ====
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  // ==== FUNCTIONS AND HANDLERS ====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLoginError(null); // this clears the error message when the user starts typing
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate("/home");
      } else {
        setLoginError("Email or password is incorrect.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Login</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      {loginError && <p>{loginError}</p>}

      <button type="submit">Login</button>

      <p>
        Don't have an account? <NavLink to="/signup">Register</NavLink>
      </p>
    </form>
  );
};

export default Login;
