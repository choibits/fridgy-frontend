import { createContext, useState } from "react";
import type { User, SignupFormData } from "../types/index";

// 1. Create a type for the data you want to share
interface AuthContextType {
  user: User | null; // Current user (or null if logged out)

  // Function that takes email/password, returns a Promise
  // login: (email: string, password: string) => Promise<void>;

  // Function that takes user details
  signup: (signupFormData: SignupFormData) => Promise<void>;

  // Simple function that doesn't return anything - later we will set user to null when called
  logout: () => void;

  // Boolean to check if user is logged in
  isLoggedIn: boolean;
}

// 2. Create an "Empty Context Box" with fallbacks / defaults
const AuthContext = createContext<AuthContextType>({
  user: null,
  // login: async () => {
  //   console.log("Fallback login function called (no provider set)");
  // },
  signup: async () => {
    console.log("Fallback signup function called (no provider set)");
  },
  logout: () => {
    console.log("Fallback logout function called (no provider set)");
  },
  isLoggedIn: false,
});

// 3. PROVIDER component that wraps your app and provides the context
// children is a special prop that represents whatever is nested inside a component’s opening and closing tags
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ==== STATES TO SHARE ====
  // This is the state to keep track of the logged in user - starts as null
  const [user, setUser] = useState<User | null>(null);

  const signup = async (signupFormData: SignupFormData) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupFormData),
      });

      if (!response.ok) throw new Error("Signup failed");

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        console.log("Signup failed. Please try again." + error.message);
        // setError("Sign up failed. Please try again." + error.message); // TODO: create error state to hold this? Not sure if doing that in the AuthContext will cause it to break
      } else {
        console.log("Error is not an instance of Error. Signup failed. Please try again.");
        // setError("Sign up failed. Please try again.");
      }
    }
  };

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await fetch("http://localhost:8080/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) throw new Error("Login failed");

  //     const userData = await response.json(); 

  //     setUser(userData); // Save user to state
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     if (error instanceof Error) {
  //       console.log("Login failed. Please try again." + error.message);
  //     } else {
  //       console.log("Error is not an instance of Error. Login failed. Please try again.")
  //     }
  //   }
  // };

  // Logout function
  const logout = () => {
    setUser(null);
    console.log("User logged out");
    // set isLogged in to false
  };

  // Wraps whatever child components were passed in (children) inside an AuthContext.Provider - so you don't have to keep providing the values again and again and manually pass to every component that needs it.

  //for !!user This turns the user (object or null) into a boolean: if user is truthy then true, iff null then false
  return (
    <AuthContext.Provider
      value={{ user, signup, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
