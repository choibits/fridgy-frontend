import { useState, useContext } from "react";
import { type JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/index";
import { AuthContext } from "../context/AuthContext";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Heading,
  Box,
} from "@chakra-ui/react";

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
    // <form onSubmit={handleSubmit} autoComplete="off">
    //   <h2>Login</h2>

    //   <div>
    //     <label htmlFor="email">Email</label>
    //     <input
    //       type="text"
    //       name="email"
    //       id="email"
    //       value={formData.email}
    //       onChange={handleInputChange}
    //     />
    //   </div>

    //   <div>
    //     <label htmlFor="password">Password</label>
    //     <input
    //       type="password"
    //       name="password"
    //       id="password"
    //       value={formData.password}
    //       onChange={handleInputChange}
    //     />
    //   </div>

    //   {loginError && <p>{loginError}</p>}

    //   <button type="submit">Login</button>

    //   <p>
    //     Don't have an account? <NavLink to="/signup">Register</NavLink>
    //   </p>
    // </form>

    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      p={4}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <Card.Root maxW="sm" w="full" p={6}>
          <Card.Header>
            <Heading size="md">Login</Heading>
            <Text fontSize="sm" color="gray.500">
              Enter your email and password below
            </Text>
          </Card.Header>

          <Card.Body>
            <Stack gap={4}>
              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Field.Root>

              {loginError && (
                <Text color="red.500" fontSize="sm">
                  {loginError}
                </Text>
              )}
            </Stack>
          </Card.Body>

          <Card.Footer flexDirection="column" alignItems="flex-start" gap={3}>
            <Button type="submit" variant="solid" colorScheme="blue" w="full">
              Login
            </Button>

            <Text fontSize="sm">
              Don't have an account? Register{" "}
              <Link to="/signup" style={{ color: "#3182ce" }}>
                here
              </Link>
            </Text>
          </Card.Footer>
        </Card.Root>
      </form>
    </Box>
  );
};

export default Login;
