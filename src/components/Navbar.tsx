import { type JSX, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Menu, Portal, Flex } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { removeAuthData } from "../utils/localStorageUtil";

const Navbar = (): JSX.Element => {
  const { authData, setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthData();
    setAuthData(null); // Clear auth data in context
    navigate("/auth/login");
  };

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
                {authData ? (
                  // Logged-in menu
                  <>
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
                    <Menu.Item
                      asChild
                      value="loginlogoutbutton"
                      onClick={handleLogout}
                    >
                      <Link to="/auth/login">
                        <Button size="sm" variant="solid" colorPalette="orange">
                          Logout
                        </Button>
                      </Link>
                    </Menu.Item>
                  </>
                ) : (
                  // Logged-out menu
                  <>
                    <Menu.Item asChild value="home">
                      <Link to="/auth/signup">Sign up</Link>
                    </Menu.Item>
                    <Menu.Item asChild value="loginlogoutbutton">
                      <Link to="/auth/login">
                        <Button size="sm" variant="solid" colorPalette="orange">
                          Login
                        </Button>
                      </Link>
                    </Menu.Item>
                  </>
                )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Flex>
    </nav>
  );
};

export default Navbar;
