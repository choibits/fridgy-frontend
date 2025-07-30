import { type JSX } from "react";
import { Button, Heading, Flex, Box, Spacer, Text } from "@chakra-ui/react";
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
        <Flex gap="4" direction="column">
          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Easily manage multiple grocery lists and fridges</Text>
          </Box>

          <Spacer />

          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Track item expiration dates</Text>
          </Box>

          <Spacer />

          <Box bg="gray.100" width="30" height="30" padding="5" margin="5">
            <Text>Reduce grocery spending and food waste</Text>
          </Box>
        </Flex>

        <Link to="/signup">
          <Button>Join now</Button>
        </Link>
      </section>
    </Flex>
  );
};

export default Landing;
