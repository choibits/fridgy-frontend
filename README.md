# fridgy-frontend
<img src="./src/assets/Fridgy ERD.png" alt="Fridgy ERD" width="750"/>

## Description
Fridgy is a web app for managing groceries and refrigerator items. The goal of this app is to help users track items they want to buy (Grocery List) and items they already have (Refrigerator). This frontend app allows users to register, log in, create grocery lists, add items, mark items as bought, and transfer them into their refrigerator—all using a clean, list-based UI.

## Features
- Data seeder to populate the database with initial data
- Authentication using JWT tokens (sign up, log in, log out)
- Grocery List
  - Users can create multiple grocery lists
  - Add items to grocery lists and edit or delete them as needed
  - Mark items as bought with checkboxes and move items into the refrigerator
- Refrigerator
  - View fridge items per fridge
  - Delete items when used up
- [Pollinations API](https://pollinations.ai) integration for AI recipe suggestions based on existing fridge items

## Frontend Technologies
- **React**: Used for building the UI with components like Header, GroceryListDetails, RefrigeratorDetails
- **TypeScript**: Provides type safety across components and API calls
- **Chakra UI**: Component library for rapid, accessible, and styled components
- **React Router**: Handles frontend routing (e.g., `/grocery-list/:id`, `/refrigerator/:id`)
- **Context API**: For managing authentication state (AuthContext)
- **LocalStorage**: Persists JWT tokens for authenticated sessions

## Backend Technologies
- **Java 17**
- **Spring Boot** (REST controllers, service layer, JPA repositories)
- **JWT**: Used for user authentication
- **Spring Security**: Secures endpoints and manages authentication
- **JPA + Hibernate**: Mapping objects to database tables with annotations using Java persistence API and Hibernate ORM (Object Relational Mapping)
- **PostgreSQL**: Primary database for production
- **ModelMapper**: Used to map between Entity and DTO classes
- **Lombok**: Reduces boilerplate code with annotations like `@Getter`, `@Setter`, `@AllArgsConstructor`

## API Endpoints

### Authentication - signup and login pages
  - `POST /auth/signup`: Register a new user on Signup page
  - `POST /auth/login`: Log in with registered user on Login page

### GroceryLists page
  - `GET /grocerylists/users/{userId}`: Get all grocery lists for a user
  - `POST /grocerylists`: Create a new grocery list
  - `DELETE /grocerylists/{listId}`: Delete a grocery list

### GroceryListDetails page
- `GET /grocerylists/{listId}`: Get a grocery list by ID
- `POST /grocerylists/{listId}/items`: Create an item in the grocery list
- `DELETE /grocerylists/{listId}/items/{itemId}`: Delete an item from the grocery list
- `PUT /grocerylists/{listId}/items/{editingItemId}`: Update an item in the grocery list

**Add to refrigerator section of GroceryListDetails page**
- `GET /refrigerators`: Get all refrigerators to display in dropdown
- `POST /refrigerators/{selectedFridgeId}/items`: Add items to fridge from checked items on the grocery list

### Refrigerators page
  - `GET /grocerylists/users/{userId}`: Get all refrigerators for a user
  - `POST /refrigerators`: Create a new refrigerator
  - `DELETE /refrigerators/{listId}`: Delete a refrigerator

### Refrigerator Details page
- `GET /refrigerators/{fridgeId}`: Get a refrigerator by ID
- `DELETE refrigerators/{fridgeId}/items/{itemId}`: Delete an item from the refrigerator
- `PUT /refrigerators/{fridgeId}/items/{editingItemId}`: Update an item in the refrigerator





