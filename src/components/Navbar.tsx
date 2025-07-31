import { type JSX } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, Portal, Flex } from "@chakra-ui/react";

// TODO:
/* Your application’s name or logo.
Conditional Buttons: The buttons displayed must change based on the user’s authentication status.
If Logged Out: The navbar must show a “Login” button and a “Sign Up” button.
If Logged In: The “Login” and “Sign Up” buttons must be hidden. Instead, a single button like “Go to Dashboard” or “Open App” should be displayed, allowing the user to enter the main part of your application. */

const Navbar = (): JSX.Element => {

  return (
    <nav>
      <Flex
        as="main"
        direction="row"
        minH="10vh"
        p={8}
        justify="flex-end"
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
                <Menu.Item asChild value="home">
                  <Link to="/home">Home</Link>
                </Menu.Item>
                <Menu.Item asChild value="grocerylists">
                  <Link to="/grocerylists">Grocery Lists</Link>
                </Menu.Item>
                <Menu.Item asChild value="refrigerators">
                  <Link to="/refrigerators">Refrigerators</Link>
                </Menu.Item>
                <Menu.Item asChild value="profile">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item asChild value="loginlogoutbutton">
                  <Link to="/auth/login">
                    <Button size="sm" variant="solid" colorPalette="orange">
                      Login
                    </Button>
                  </Link>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </nav>
  );
};

export default Navbar;
