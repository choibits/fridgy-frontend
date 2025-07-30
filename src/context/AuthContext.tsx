import { createContext, useState } from "react";
import type { User } from "../types/index";

// for the "Mock" API call
import { addUser, findUser } from "../data/data";

// 1. Create a type for the data you want to share (users)
interface AuthContextType {
  user: User | null; // Current user (or null if logged out)

  // Function that takes email/password, returns a Promise
  login: (email: string, password: string) => Promise<boolean>;

  // Function that takes user details
  signup: (userData: User) => void;

  // Simple function that doesn't return anything - later we will set user to null when called
  logout: () => void;

  // Boolean to check if user is logged in
  isLoggedIn: boolean;
}

// 2. Create an "Empty Context Box" with fallbacks / defaults
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: () => {
    console.log("Fallback signup (no provider set)");
  },
  logout: () => {
    console.log("Fallback logout (no provider set)");
  },
  isLoggedIn: false,
});

// 3. PROVIDER component that wraps your app and provides the context
// children is a special prop that represents whatever is nested inside a component’s opening and closing tags
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // ==== STATES TO SHARE ====
  // This is the state to keep track of the logged in user - starts as null
  const [user, setUser] = useState<User | null>(null);

  const signup = async (userData: User) => {
    //  TODO: this would make a POST request to the backend -
    // await fetch("/api/signup", { method: "POST", body: JSON.stringify({ ... }) });
    const newUser: User = {
      id: Math.floor(Math.random() * 1000),
      ...userData,
    };
    addUser(newUser); // Save to my MOCK database
    setUser(newUser); // Save to state
  };

  // TODO: send a fetch GET login request to your server - Then update state with the response if it’s successful (i.e. if 200 ok?)
  const login = async (email: string, password: string) => {
    const existingUser = await findUser(email, password); // check MOCK database
    if (existingUser) {
      setUser(existingUser);
      return true;
    } else {
      console.log("Login failed: user not found");
      return false;
    }
  };


  // Logout function
  const logout = () => {
    setUser(null);
    console.log("User logged out");
    // set isLogged in to false
  };

  // Wraps whatever child components were passed in (children) inside an AuthContext.Provider - so you don't have to keep providing the values again and again and manually pass to every component that needs it.
  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
