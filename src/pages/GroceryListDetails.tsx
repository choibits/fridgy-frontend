import { type JSX, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import type { GroceryList } from "../types";
import {
  Flex,
  Heading,
  Table,
  Box,
  Card,
  Stack,
  Field,
  Input,
  Text,
  Button,
  Portal,
  Popover,
  Checkbox,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../config";

interface formData {
  itemName: string;
  quantity: number | null;
  expirationDate: string;
}

const GroceryList = (): JSX.Element => {
  const [formData, setFormData] = useState<formData>({
    itemName: "",
    quantity: null,
    expirationDate: "",
  });
  const { itemName, quantity, expirationDate } = formData;
  const [error, setError] = useState<string>("");
  const [groceryList, setGroceryList] = useState<GroceryList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (authData?.token) {
      getGroceryList();
    }
  }, [authData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!itemName || !quantity || !expirationDate) {
      setError("All fields are required.");
      return;
    }

    setIsLoading(true);
    await createItem();
    setIsLoading(false);
  };

  const createItem = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.token}`,
        },
        body: JSON.stringify({ itemName, quantity, expirationDate }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Create item call failed. Please try again.");
        }
        return;
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating item:", error);
      if (error instanceof Error) {
        setError("Error creating item. Please try again.");
        console.log(error.message);
      } else {
        setError("Error creating item... Please try again.");
      }
    }
    await getGroceryList(); // Refresh list after creation
    console.log("Items in state:", items);
  };

  const getGroceryList = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/grocerylists/${authData?.id}`,
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
      setGroceryList(data); // Stores grocery lists in state
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

  const handleDeleteItem = async (itemId: number | undefined) => {
    if (itemId === undefined) return; // extra safety check
    try {
    
      const groceryListId = groceryList?.id;
      // TODO: make sure all of my fetches are not using localStorage vs. authData

      const response = await fetch(`${API_BASE_URL}/grocerylists/${groceryListId}/items/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
      console.log(response);
      setGroceryList((prevState) => {
        if (prevState) {
          const updatedItems = prevState?.items?.filter(
            (item) => item.id !== itemId
          );
          // redefine the items
          return { ...prevState, items: updatedItems };
        }
        return prevState;
      });

      // setItems((prevLists) => prevLists.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  // ===== TABLE SPECIFIC STATES AND FUNCTIONS =====
  const [selection, setSelection] = useState<string[]>([]);
  const indeterminate = selection.length > 0 && selection.length < items.length;
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    itemName: "",
    quantity: "",
    expirationDate: "",
  });

  const handleEditClick = (item: Item) => {
    if (!item.id) return;
    setEditingItemId(item.id);
    setFormValues({
      itemName: item.itemName,
      quantity: item.quantity.toString(),
      expirationDate: item.expirationDate,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Call your API or update state here
    console.log("Saving updated item:", editingItemId, formValues);
    setEditingItemId(null);
  };

  const rows = groceryList?.items?.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.itemName) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          mt="0.5"
          aria-label="Select row"
          checked={selection.includes(item.itemName)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.itemName]
                : selection.filter((name) => name !== item.itemName)
            );
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.itemName}</Table.Cell>
      <Table.Cell>{item.quantity}</Table.Cell>
      <Table.Cell>{item.expirationDate}</Table.Cell>
      <Table.Cell>
        <Flex gap={2}>
          <Popover.Root
            open={editingItemId === item.id}
            onOpenChange={(isOpen) => {
              if (!isOpen) setEditingItemId(null);
            }}
          >
            <Popover.Trigger asChild>
              <Button
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={() => handleEditClick(item)}
              >
                Edit
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Stack gap="4">
                      <Field.Root>
                        <Field.Label>Name</Field.Label>
                        <Input
                          name="itemName"
                          value={formValues.itemName}
                          onChange={handleEditChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Quantity</Field.Label>
                        <Input
                          name="quantity"
                          type="number"
                          value={formValues.quantity}
                          onChange={handleEditChange}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Expiration Date</Field.Label>
                        <Input
                          name="expirationDate"
                          type="date"
                          value={formValues.expirationDate}
                          onChange={handleEditChange}
                        />
                      </Field.Root>
                      <Button onClick={handleSave} colorScheme="green">
                        Save
                      </Button>
                    </Stack>
                  </Popover.Body>
                  <Popover.CloseTrigger />
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </Button>
        </Flex>
      </Table.Cell>
    </Table.Row>
  ));

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
        {/* TODO: Make grocery list name dynamic */}
        <Heading size="2xl">Grocery List Name</Heading>
        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          minH="25vh"
          minW="50vw"
          p={4}
        >
          <form onSubmit={handleAddItem} autoComplete="off">
            <Card.Root maxW="sm" w="full" p={6}>
              <Card.Header>
                <Heading size="md">Create a new item</Heading>
              </Card.Header>

              <Card.Body>
                <Stack gap={4}>
                  <Field.Root>
                    <Field.Label>Item name </Field.Label>
                    <Input
                      type="text"
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleChange}
                      required
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Quantity </Field.Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={formData.quantity || ""}
                      onChange={handleChange}
                      required
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Expiration date </Field.Label>
                    <Input
                      type="text"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleChange}
                      required
                      placeholder="yyyy-MM-dd"
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
                  Create Item
                </Button>
              </Card.Footer>
            </Card.Root>
          </form>
        </Box>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="6">
                <Checkbox.Root
                  size="sm"
                  mt="0.5"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked ? items.map((item) => item.itemName) : []
                    );
                  }}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
              </Table.ColumnHeader>
              <Table.ColumnHeader>Item name</Table.ColumnHeader>
              <Table.ColumnHeader>Quantity</Table.ColumnHeader>
              <Table.ColumnHeader>Expiration date</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table.Root>
      </Flex>
    </>
  );
};

export default GroceryList;
