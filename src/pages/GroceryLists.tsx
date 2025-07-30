import { type JSX } from "react";
import { Stack, Heading, Box, Flex, Link } from "@chakra-ui/react";

const GroceryLists = (): JSX.Element => {
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
        <Heading size="2xl">Grocery Lists</Heading>
        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          minH="25vh"
          minW="50vw"
          p={4}
          borderWidth="1px"
        >
          <Stack>
            <Link variant="underline" to="/grocerylists/1">
              Grocery List 1
            </Link>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default GroceryLists;
