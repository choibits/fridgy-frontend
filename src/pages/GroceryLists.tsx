import { type JSX, useState } from "react";
import {
  Stack,
  Heading,
  Box,
  Flex,
  Link,
  Card,
  Text,
  Field,
  Input,
  Button,
} from "@chakra-ui/react";

interface formData {
  listName: string;
}

const GroceryLists = (): JSX.Element => {
  const [formData, setFormData] = useState<formData>({
    listName: "",
  });

  const [error, setError] = useState<string>("");
  const { listName } = formData;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!listName) {
      setError("List name is required.");
      return;
    }

    setIsLoading(true);
    await createList();
    setIsLoading(false);
  };

  const createList = async () => {
    try {
      const response = await fetch("/grocerylists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError("Call failed. Please try again.")
        throw new Error("Create grocery list call failed");
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating grocery list:", error);
      if (error instanceof Error) {
        setError(
          "Error creating grocery list. Please try again. Error message: " +
            error.message
        );
      } else {
        console.log(
          setError("Error creating grocery list... Please try again.")
        );
      }
    }
  };

  const getGroceryLists = async () => {
    try {
      const response = await fetch("/grocerylists/:id", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Get grocery lists call failed");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error getting grocery lists:", error);
      if (error instanceof Error) {
        setError(
          "Error getting grocery lists. Please try again. Error message: " +
            error.message
        );
      } else {
        console.log(
          setError("Error getting grocery lists... Please try again.")
        );
      }
    }
  };

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

        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          minH="25vh"
          minW="50vw"
          p={4}
          borderWidth="1px"
        >
          <form onSubmit={handleSubmit} autoComplete="off">
            <Card.Root maxW="sm" w="full" p={6}>
              <Card.Header>
                <Heading size="md">Create a new list</Heading>
              </Card.Header>

              <Card.Body>
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>List name: </Field.Label>
                    <Input
                      type="name"
                      name="name"
                      value={formData.listName}
                      onChange={handleChange}
                      required
                    />
                  </Field.Root>

                  {error && (
                    <Text color="red.500" fontSize="sm">
                      {error}
                    </Text>
                  )}
                </Stack>
              </Card.Body>

              <Card.Footer
                flexDirection="column"
                alignItems="flex-start"
                gap={3}
              >
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="blue"
                  w="full"
                  disabled={isLoading}
                >
                  Create List
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default GroceryLists;
