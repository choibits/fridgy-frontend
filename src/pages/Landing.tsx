import { type JSX } from "react";
import { Button, Heading, Flex, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Landing = (): JSX.Element => {
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      minH="100vh"
      p={8}
      textAlign="center"
    >
      <header>
        <Heading size="5xl">Fridgy</Heading>
        <Heading size="2xl">Never forget what's in your fridge</Heading>
      </header>

      <section>
        <Heading size="xl">Why choose Fridgy?</Heading>
        <Flex direction="column" padding="5">
          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Easily manage multiple grocery lists and fridges</Text>
          </Box>

          <br></br>
          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Track item expiration dates</Text>
          </Box>
          <br></br>

          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Reduce grocery spending and food waste</Text>
          </Box>
        </Flex>
        <br></br>
        <Link to="/signup">
          <Button>Join now</Button>
        </Link>

        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          p={4}
        >
          <Text fontSize="sm">
            Already have an account? Login{" "}
            <Link to="/login" style={{ color: "#3182ce" }}>
              here
            </Link>
          </Text>
        </Box>
      </section>
    </Flex>
  );
};

export default Landing;
