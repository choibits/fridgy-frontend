import { type JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Button, Menu, Portal, Flex } from "@chakra-ui/react";

// TODO:
/* Your application’s name or logo.
Conditional Buttons: The buttons displayed must change based on the user’s authentication status.
If Logged Out: The navbar must show a “Login” button and a “Sign Up” button.
If Logged In: The “Login” and “Sign Up” buttons must be hidden. Instead, a single button like “Go to Dashboard” or “Open App” should be displayed, allowing the user to enter the main part of your application. */

// TODO: Fix links
const links = [
  {
    title: "Home",
    href: "https://localhost:3000/home",
  },
  {
    title: "Grocery Lists",
    href: "https://localhost:3000/grocerylists",
  },
  {
    title: "Refrigerators",
    href: "http://localhost:3000/refrigerators",
  },
];

const Navbar = (): JSX.Element => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    // TODO: Home should only be visible to logged in users??
    <nav>
      <Flex
        as="main"
        direction="row"
        minH="10vh"
        p={8}
        justifyContent="space-between"
        bg="gray.100"
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button size="sm" variant="solid" colorPalette="orange">
              Menu
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {links.map((link) => (
                  <Menu.Item key={link.href} asChild value={link.title}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.title}
                    </a>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <Button size="sm" variant="solid" colorPalette="orange">
          Login
        </Button>
      </Flex>
    </nav>
  );
};

export default Navbar;
