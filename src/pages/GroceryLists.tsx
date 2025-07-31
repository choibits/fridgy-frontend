import { type JSX, useState, useContext, useEffect } from "react";
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
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import type { GroceryList } from "../types";

interface formData {
  listName: string;
}

const GroceryLists = (): JSX.Element => {
  const [formData, setFormData] = useState<formData>({
    listName: "",
  });
  const [error, setError] = useState<string>("");
  const { listName } = formData;
  const [groceryLists, setGroceryLists] = useState<GroceryList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (authData?.token) {
      getGroceryLists();
    }
  }, [authData]);

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
      const response = await fetch(`${API_BASE_URL}/grocerylists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.token}`,
        },
        body: JSON.stringify({ listName }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Create grocery list call failed. Please try again.");
        }
        return;
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating grocery list:", error);
      if (error instanceof Error) {
        setError("Error creating grocery list. Please try again.");
        console.log(error.message);
      } else {
        setError("Error creating grocery list... Please try again.");
      }
    }
    await getGroceryLists(); // Refresh list after creation
  };

  const getGroceryLists = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/grocerylists/users/${authData?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Get grocery lists call failed. Please try again.");
        }
        return;
      }
      setGroceryLists(data); // Stores grocery lists in state
      console.log(data);
    } catch (error) {
      console.error("Error getting grocery lists:", error);
     if (error instanceof Error) {
       setError("Error getting grocery lists. Please try again.");
       console.log(error.message);
     } else {
       setError("Error getting grocery lists... Please try again.");
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
        >
          <Stack gap={2}>
            {groceryLists.map((list) => (
              <Link
                key={list.id}
                variant="underline"
                href={`/grocerylists/${list.id}`}
              >
                {list.listName}
              </Link>
            ))}
          </Stack>
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          minH="25vh"
          minW="50vw"
          p={4}
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
                      type="text"
                      name="listName"
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
                <Button type="submit" w="full" disabled={isLoading}>
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
