// Dtos look similar to what UI expects
// create an interface that looks like the AuthResponseDto
import type { LocalStorageStatus, AuthResponse } from "../types";
// const to use to store the auth data in local storage
const AUTH_DATA_KEY = "fridgy_auth_key";

// can be void but boolean is more explicit
export const saveAuthData = (authData: AuthResponse): LocalStorageStatus => {
  // need to wrap in a try catch block because localStorage can throw an error
  try {
    // when you save anything to localStorage, it saves in key value pairs
    // authData is of type AuthResponse, but it needs to be converted to a string to save to local storage
    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData));
    return {
      success: true,
      message: "Auth data saved successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error saving auth data",
    };
  }
};

export const getAuthData = (): AuthResponse | null => {
    try {
        const data = localStorage.getItem(AUTH_DATA_KEY);
        // if data exists, parse JSON
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const removeAuthData = (): void => {

} 