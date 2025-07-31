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
  Table,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";
import type { Refrigerator } from "../types"; // Make sure this is defined

interface FormData {
  fridgeName: string;
}

const Refrigerators = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({ fridgeName: "" });
  const [error, setError] = useState<string>("");
  const [refrigerators, setRefrigerators] = useState<Refrigerator[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (authData?.token) {
      getRefrigerators();
    }
  }, [authData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!formData.fridgeName) {
      setError("Fridge name is required.");
      return;
    }
    setIsLoading(true);
    await createRefrigerator();
    setIsLoading(false);
  };

  const createRefrigerator = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/refrigerators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.token}`,
        },
        body: JSON.stringify({ fridgeName: formData.fridgeName }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.message || "Error creating refrigerator.");
        return;
      }
      setFormData({ fridgeName: "" });
      await getRefrigerators();
    } catch (err) {
      console.error("Error creating refrigerator:", err);
      setError("Something went wrong.");
    }
  };

  const getRefrigerators = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/refrigerators`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.message || "Failed to fetch refrigerators.");
        return;
      }
      setRefrigerators(data);
    } catch (err) {
      console.error("Error fetching refrigerators:", err);
      setError("Something went wrong.");
    }
  };

  const handleDelete = async (fridgeId: number | undefined) => {
    if (!fridgeId) {
      setError("Refrigerator does not exist");
      return;
    }
    try {
      await fetch(`${API_BASE_URL}/refrigerators/${fridgeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      setRefrigerators((prev) => prev.filter((f) => f.id !== fridgeId));
    } catch (err) {
      console.error("Error deleting refrigerator:", err);
      setError("Failed to delete refrigerator.");
    }
  };

  return (
    <Flex as="main" direction="column" align="center" minH="100vh" p={8}>
      <Heading size="2xl">My Refrigerators</Heading>

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
              <Table.ColumnHeader>Fridge name</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {refrigerators.map((fridge) => (
              <Table.Row key={fridge.id}>
                <Table.Cell>
                  <Link
                    href={`/refrigerators/${fridge.id}`}
                    color="blue.500"
                    variant="underline"
                  >
                    {fridge.fridgeName}
                  </Link>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Button
                    size="sm"
                    onClick={() => handleDelete(fridge.id)}
                  >
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
        <form onSubmit={handleSubmit}>
          <Card.Root maxW="sm" w="full" p={6}>
            <Card.Header>
              <Heading size="md">Create a new refrigerator</Heading>
            </Card.Header>

            <Card.Body>
              <Stack gap={4}>
                <Field.Root>
                  <Field.Label>Fridge name: </Field.Label>
                  <Input
                    type="text"
                    name="fridgeName"
                    value={formData.fridgeName}
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

            <Card.Footer flexDirection="column" alignItems="flex-start" gap={3}>
              <Button type="submit" w="full" disabled={isLoading}>
                Create Refrigerator
              </Button>
            </Card.Footer>
          </Card.Root>
        </form>
      </Box>
    </Flex>
  );
};

export default Refrigerators;