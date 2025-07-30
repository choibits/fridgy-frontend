// This is  where we export the interfaces that mocks the API response data (from springboot RESTful API built on Java or a public API)

// ==== USER TYPES ====
export interface User {
  id?: number;
  email: string;
  password: string;
  agreeToTerms: boolean;
}

// ==== SIGNUP FORM TYPES ====
export interface SignupFormData {
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export type SignupFormErrors = {
  email?: string;
  password?: string;
  agreeToTerms?: string;
};

// ==== LOGIN FORM TYPES ====
export interface LoginFormData {
  email: string;
  password: string;
}

// ==== GROCERY LIST TYPES ====
export interface GroceryList {
  id?: number;
  name: string;
  items: Item[];
  userId: number;
}

// ==== ITEM TYPES ====
export interface Item {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
}
