// Sign up page that collects email and password, validates inputs, and sends a POST request to the backend to create a new user.

import { type JSX, useState } from "react";
import { Link } from "react-router-dom";
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
import { API_BASE_URL } from "../config";

interface FormData {
  email: string;
  password: string;
}

interface SignupFormErrors {
  email: string;
  password: string;
}

const Signup = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<SignupFormErrors>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const [signupSuccess, setSignupSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Clear feedback on new input
    if (error) setError("");
    if (signupSuccess) setSignupSuccess(false);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateField = (name: string, value: string): string => {
    let error = "";

    if (name === "email" && typeof value === "string") {
      if (!value.trim()) error = "Email is required.";
      else if (!/\S+@\S+\.\S+/.test(value))
        error = "Email must be valid (contain @ and .)";
      // 	\S+ = one or more non-whitespace characters
      // @ = must contain an @ symbol
      // . = must contain a dot after the @
      // .test(value) returns true if the value matches, otherwise false.
    } else if (name === "password" && typeof value === "string") {
      if (!value.trim()) error = "Password is required.";
      else if (value.length < 8 || !/[A-Z]/.test(value) || !/\d/.test(value))
        error =
          "Password must be at least 8 characters, contain an uppercase letter and a number.";
    }
    setFieldErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // event.target is the <input> element that lost focus.
    const { name, value } = event.target;

    const typedName = name as keyof SignupFormErrors; // tells typescript that the name is a key of FormData
    const errorMessage = validateField(typedName, value);

    setFieldErrors((prev) => ({
      ...prev,
      [typedName]: errorMessage, // use typedName vs. name because we want to use the typedName (which is a key of SignupFormErrors) for Typescript
    }));

    // early exit if there's an error
    if (errorMessage) {
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({
      email: "",
      password: "",
    });

    for (const name in formData) {
      const typedName = name as keyof SignupFormErrors;
      const error = validateField(typedName, formData[typedName]);
      fieldErrors[typedName] = error;
    }
    // need loading states to prevent double actions otherwise user could submit multiple times and create duplicate post requests (users in this case)
    setIsLoading(true);
    await signup();
    setIsLoading(false);
  };

  const signup = async () => {
    console.log("signing up");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Account not created");
      }
      const data = await response.json();
      console.log(data);
      setSignupSuccess(true);
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          "Signup failed. Please try again. Error message: " + error.message
        );
      } else {
        setError("Signup failed. Please try again.");
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
        <Heading size="2xl">Sign up</Heading>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="50vh"
          p={4}
        >
          <form onSubmit={handleSubmit}>
            <Card.Root maxW="sm" w="full" p={6}>
              <Card.Header>
                <Heading size="md">Join the Fridgy fam!</Heading>
                <Text fontSize="sm" color="gray.500">
                  Sign up with your email and password below
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
                      onBlur={handleBlur}
                      required
                    />
                    {fieldErrors.email && (
                      <Text color="red.500" fontSize="sm">
                        {fieldErrors.email}
                      </Text>
                    )}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Password</Field.Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {fieldErrors.password && (
                      <Text color="red.500" fontSize="sm">
                        {fieldErrors.password}
                      </Text>
                    )}
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
                  w="full"
                  disabled={isLoading}
                  // submit button is disabled if isLoading is true
                >
                  Submit
                </Button>
                <Text fontSize="sm">
                  Already have an account?{" "}
                  <Link to="/auth/login" style={{ color: "#3182ce" }}>
                    Login
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

        {signupSuccess && (
          <Text mt={4} color="green.500">
            Account successfully created!{" "}
            <Link to="/auth/login" style={{ color: "#3182ce" }}>
              Login now
            </Link>
          </Text>
        )}
      </Flex>
    </>
  );
};

export default Signup;
