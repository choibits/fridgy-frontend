import React, { useState } from "react";
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

interface FormData {
  email: string;
  password: string;
}

const Login2 = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const { email, password } = formData;

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

    await login();
    navigate("/home");
  };

  const login = async () => {
    console.log("logging in");

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Signup failed");
      const data = await response.json();
      //   localStorage.setItem("token", data.token); //TODO: could set token here
      console.log(data);
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          "Login failed. Please try again. Error message: " + error.message
        );
      } else {
        console.log(setError("Login failed. Please try again."));
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
        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
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

                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}
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
                >
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
        
        {error && (
          <Text color="red.500" fontSize="sm">
            {error}
          </Text>
        )}
      </Flex>
    </>
  );
};

export default Login2;
