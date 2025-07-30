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

  const { email, password } = formData;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    const { name, value } = event.target;

    const typedName = name as keyof SignupFormErrors; // tells typescript that the name is a key of FormData
    const errorMessage = validateField(typedName, value);

    setFieldErrors((prev) => ({
      ...prev,
      [typedName]: errorMessage, // use typedName vs. name because we want to use the typedName (which is a key of SignupFormErrors) for Typescript
    }));

    // TODO: not sure about this part
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

    if (fieldErrors.email || fieldErrors.password) {
      return;
    }

    await signup();
  };

  const signup = async () => {
    console.log("signing up");
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      console.log(data);
      setSignupSuccess(true);
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          "Login failed. Please try again. Error message: " + error.message
        );
      } else {
        setError("Login failed. Please try again.");
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
                  colorScheme="blue"
                  w="full"
                >
                  Submit
                </Button>
                <Text fontSize="sm">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#3182ce" }}>
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
            <Link to="/login" style={{ color: "#3182ce" }}>
              Login now
            </Link>
          </Text>
        )}
      </Flex>
    </>
  );
};

export default Signup;
