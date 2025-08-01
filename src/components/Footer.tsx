import { type JSX } from "react";
import { Text, Flex } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <nav>
      <Flex
        as="main"
        direction="row"
        minH="10vh"
        p={8}
        justify="center"
        bg="orange.600"
      >
        <Text color="white">© 2025 Fridgy</Text>
      </Flex>
    </nav>
  );
};

export default Footer;
