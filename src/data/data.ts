import type { User } from "../types/index";
import type { GroceryList } from "../types/index";

const users: User[] = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: "Password123",
    agreeToTerms: true,
  },
];

export const groceryLists: GroceryList[] = [
  {
    id: 1,
    name: "Grocery List 1",
    items: [
      { id: 1, name: "Apples", quantity: 5 , expirationDate: "2023-12-31"},
      { id: 2, name: "Bananas", quantity: 3, expirationDate: "2023-12-31"},
    ],
    userId:1,
  },
];

// const foods: Food[] = [];

// These all would normally just be API calls to a database

// Simulate "adding user" to the database
export function addUser(newUser: User): void {
  users.push(newUser);
  console.log("User added:", newUser);
}

// Simulate finding a user by email and password
export function findUser(
  email: string,
  password: string
): User | undefined {
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

// Optional: Function to find by email only (e.g. to check if a user already exists)
export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

// For debugging/testing
export function getAllUsers(): User[] {
  return users;
}
