import { type JSX, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SignupForm from "../components/SignupForm";
import type { SignupFormData, SignupFormErrors } from "../types";
import { getAllUsers, findUserByEmail } from "../data/data";
import { NavLink } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

const Signup = (): JSX.Element => {
  // ==== CONTEXT ====
  const { signup } = useContext(AuthContext); // only need signup here?

  // ==== STATE ====
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});

  const [signupSuccess, setSignupSuccess] = useState(false);

  // ==== FUNCTIONS AND HANDLERS ====
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name: string, value: string | boolean): string => {
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
    } else if (name === "agreeToTerms" && value === false) {
      error = "You must agree to the terms.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const typedName = name as keyof SignupFormErrors; // tells typescript that the name is a key of UserSignupFormErrors

    const errorMessage = validateField(typedName, value);

    setErrors((prev) => ({
      ...prev,
      [typedName]: errorMessage, // use typedName vs. name because we want to use the typedName (which is a key of UserSignupFormErrors) for Typescript
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: SignupFormErrors = {
      email: "",
      password: "",
      agreeToTerms: "",
    };

    // set variable with let to true to start and set to false if it doesn't pass validation
    let isValid = true;

    for (const name in formData) {
      const typedName = name as keyof SignupFormErrors; // tells typescript that the name is a key of UserSignupFormData

      const error = validateField(typedName, formData[typedName]);

      newErrors[typedName] = error;
      if (error) {
        isValid = false;
      }
    }

    setErrors(newErrors);

    // signup comes from AuthContext
    if (isValid) {
      signup({
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agreeToTerms,
      });

      // check if user was added to db
      console.log("Users: ", getAllUsers());

      const userWasAdded = findUserByEmail(formData.email);
      if (userWasAdded) {
        setSignupSuccess(true);
        // reset form
        setFormData({
          email: "",
          password: "",
          agreeToTerms: false,
        });
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
        <SignupForm
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onBlur={handleBlur}
        />

        {signupSuccess && (
          <p>
            Account successfully created!
            <NavLink to="/login">Login now</NavLink>
          </p>
        )}
      </Flex>
    </>
  );
};

export default Signup;
