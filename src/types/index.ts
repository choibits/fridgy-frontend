// This is  where we export the interfaces that mocks the API response data (from springboot RESTful API built on Java or a public API)

export interface AuthResponse {
  success: boolean;
  message: string;
  id: number;
  email: string;
  token: string;
};

export interface LocalStorageStatus {
  success: boolean;
  message: string;
}

// TODO: check if i need this User type I think the AuthResponse is doing that work now?
// ==== USER TYPES ====
export interface User {
  id?: number;
  email: string;
  password: string;
}


// ==== TYPES ====
export interface GroceryList {
  id?: number;
  listName: string;
  items?: Item[];
}

export interface Refrigerator {
  id: number;
  fridgeName: string;
  items?: Item[];
}

export interface Item {
  id?: number;
  itemName: string;
  quantity: number;
  expirationDate: string;
}

export interface Recipe {
  id: number;
  prompt: string;
  response: string;
}

