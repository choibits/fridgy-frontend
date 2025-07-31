import { createContext, useState } from "react";
import type {AuthResponse} from "../types";

// Create interface for data you want to share
export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuth: boolean) => void;
  isLoading: boolean;
  authData: AuthResponse | null;
  setAuthData: (authData: AuthResponse) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {}, // function to set boolean to true or false with this
  isLoading: true,
  authData: null, // type AuthResponse
  setAuthData: () => {}, // function to set authData with this
});
