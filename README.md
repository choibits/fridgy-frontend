# fridgy-frontend
<img src="./src/assets/Fridgy ERD.png" alt="Fridgy ERD" width="750"/>

## Description
Fridgy is a web app for managing groceries and refrigerator items. The goal of this app is to help users track items they want to buy (Grocery List) and items they already have (Refrigerator). This frontend app allows users to register, log in, create grocery lists, add items, mark items as bought, and transfer them into their refrigerator—all using a clean, list-based UI.

## Features
- Authentication using JWT tokens (sign up, log in, log out)
- Grocery List
  - Users can create multiple grocery lists
  - Add items to any list and edit or delete them as needed
  - Mark items as bought and move items into the refrigerator
- Refrigerator
  - View fridge items per fridge
  - Delete items when used up
- UI is built to emphasize productivity and simplicity

## Frontend Technologies
- **React**: Used for building the UI with components like Header, GroceryListDetails, RefrigeratorDetails
- **TypeScript**: Provides type safety across components and API calls
- **Chakra UI**: Component library for rapid, accessible, and styled components
- **React Router**: Handles frontend routing (e.g., `/grocery-list/:id`, `/refrigerator/:id`)
- **Context API**: For managing authentication state (AuthContext)
- **LocalStorage**: Persists JWT tokens for authenticated sessions
- **Pollinations API**: Used to suggest recipes based on fridge items

## Backend Technologies
- **Java 17**
- **Spring Boot** (REST controllers, service layer, JPA repositories)
- **JWT**: Used for user authentication
- **Spring Security**: Secures endpoints and manages authentication
- **JPA + Hibernate**: ORM for interacting with PostgreSQL (or H2 for dev)
- **PostgreSQL**: Primary database for production
- **ModelMapper**: Used to map between Entity and DTO classes
- **Lombok**: Reduces boilerplate code with annotations like `@Getter`, `@Setter`, `@AllArgsConstructor`