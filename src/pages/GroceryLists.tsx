import { type JSX, useState, useContext, useEffect, useCallback } from "react";
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
  Table,
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

  // Define function before using in use effect
  // Memoizing is like saying - remember the result of a function so you don’t have to redo expensive work every time it’s called.
  // So memoize with useCallback for functions used in useEffect
  // then you can list in useEffect dependency array without an infinite loop
  const getGroceryLists = useCallback(async () => {
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
      if (error instanceof Error) {
        setError("Error getting grocery lists. Please try again.");
      } else {
        setError("Error getting grocery lists... Please try again.");
      }
    }
  }, [authData?.token, authData?.id]); // Memoize only when these change

  useEffect(() => {
    if (authData?.token) {
      getGroceryLists();
    }
  }, [authData, getGroceryLists]);

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

    setFormData({ listName: "" });
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
      } else {
        setError("Error creating grocery list... Please try again.");
      }
    }
    await getGroceryLists(); // Refresh list after creation
  };

  const handleDeleteList = async (listId: number | undefined) => {
    if (listId === undefined) return; // extra safety check
    try {
      await fetch(`${API_BASE_URL}/grocerylists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setGroceryLists((prevLists) =>
        prevLists.filter((list) => list.id !== listId)
      );
    } catch (error) {
      console.error("Failed to delete list", error);
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
          minW="50vw"
          p={4}
        >
          <Table.Root size="sm" interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>List name</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {groceryLists.map((list) => (
                <Table.Row key={list.id}>
                  <Table.Cell>
                    <Link
                      href={`/grocerylists/${list.id}`}
                      color="blue.500"
                      variant="underline"
                    >
                      {list.listName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <Button size="sm" onClick={() => handleDeleteList(list.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
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
