import { type JSX } from "react";
import { Link } from "react-router-dom";
import {Flex, Button, Heading} from "@chakra-ui/react"

const Home = (): JSX.Element => {
  return (
    <>
      <Flex
        as="main"
        direction="column"
        align="center"
        minH="100vh"
        p={8}
        textAlign="center"
      >
        <Heading size="2xl">Fridgy Home</Heading>
        <br></br>
        <Link to="/grocerylists">
          <Button>My Grocery Lists</Button>
        </Link>
        <br></br>
        <Link to="/refrigerators">
          <Button>My Refrigerators</Button>
        </Link>
      </Flex>
    </>
  );
};

export default Home;
