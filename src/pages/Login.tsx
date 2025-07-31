import React, { useState, useContext } from "react";
import type { JSX } from "react";
import {
  Button,
  Card,
  Field,
  Input,
  Stack,
  Text,
  Heading,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { saveAuthData } from "../utils/localStorageUtil.ts";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

interface FormData {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  // using the global context
  const { setIsAuthenticated, setAuthData } = useContext(AuthContext);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const { email, password } = formData;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setIsLoading(true);
    await login();
    setIsLoading(false);
  };

  const login = async () => {
    console.log("logging in");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Login call failed. Please try again.");
        }
        return;
      }

      console.log(data);
      saveAuthData(data);
      setIsAuthenticated(true);
      setAuthData(data);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          "Login failed. Please try again. Error message: " + error.message
        );
      } else {
        console.log(setError("Login failed... Please try again."));
      }
    }
  };

  return (
    <>
      <Flex
        as="main"
        direction="column"
        align="center"
        minH="100vh"
        p={8}
        textAlign="center"
      >
        <Heading size="2xl">Log in</Heading>
        <Box display="flex" justifyContent="center" alignSelf="center" p={4}>
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
                      onChange={handleChange}
                      required
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Field.Root>
                </Stack>
              </Card.Body>

              <Card.Footer
                flexDirection="column"
                alignItems="flex-start"
                gap={3}
              >
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  w="full"
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Text fontSize="sm">
                  Don't have an account? Register{" "}
                  <Link to="/auth/signup" style={{ color: "#3182ce" }}>
                    here
                  </Link>
                </Text>
              </Card.Footer>
            </Card.Root>
          </form>
        </Box>

        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
      </Flex>
    </>
  );
};

export default Login;
