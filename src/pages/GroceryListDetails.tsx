import { type JSX, useState, useContext, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import type { GroceryList, Refrigerator, Item } from "../types";
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
  Select,
  createListCollection,
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
  const { id: listId } = useParams();

  const getGroceryList = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/grocerylists/${listId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authData?.token}`,
        },
      });
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
  }, [authData?.token, listId]);

  useEffect(() => {
    if (authData?.token && listId) {
      getGroceryList();
    }
  }, [authData, listId, getGroceryList]);

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
      const response = await fetch(
        `${API_BASE_URL}/grocerylists/${listId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.token}`,
          },
          body: JSON.stringify({ itemName, quantity, expirationDate }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Create item call failed.");
        }
        return;
      }
      console.log(data);
    } catch (error) {
      console.error("Error creating item:", error);
      if (error instanceof Error) {
        setError("Error creating item. Please try again.");
      } else {
        setError("Error creating item... Please try again.");
      }
    }
    await getGroceryList(); // Refresh list after creation
  };

  // itemId could be undefined if you haven't entered a value yet (vs. pre setting 0)
  const handleDeleteItem = async (itemId: number | undefined) => {
    if (itemId === undefined) return; // extra safety check
    try {
      // check if groceryList id exists
      const groceryListId = groceryList?.id;

      const response = await fetch(
        `${API_BASE_URL}/grocerylists/${groceryListId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Delete Grocery List item call failed.");
        }
        return;
      }

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
      // items is nested in the grocery list so we don't need a state for items
      // setItems((prevLists) => prevLists.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to delete item", error);
      // TODO: handle error
    }
  };

  // ===== TABLE SPECIFIC STATES AND FUNCTIONS =====
  // tracks items selected via checkbox
  const [selection, setSelection] = useState<string[]>([]);
  // determines if checkboxes are partially checked - i.e. true when some but not all items are checked, false if its all or none items
  const indeterminate =
    selection.length > 0 &&
    groceryList?.items &&
    selection.length < groceryList.items.length;
  // tracks which item is being edited
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

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/grocerylists/${listId}/items/${editingItemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.token}`,
          },
          body: JSON.stringify({
            itemName: formValues.itemName,
            quantity: parseInt(formValues.quantity), // Convert string to number
            expirationDate: formValues.expirationDate,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        if (data && data.message) {
          setError(data.message);
        } else {
          setError("Update item call failed. Please try again.");
        }
        return;
      }
    } catch (error) {
      console.error("Error updating item:", error);
      if (error instanceof Error) {
        setError("Error updating item. Please try again.");
        console.log(error.message);
      } else {
        setError("Error updating item... Please try again.");
      }
    }
    console.log("Saving updated item:", editingItemId, formValues);
    // Update local state immediately
    setGroceryList((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        items:
          prev.items?.map((item) =>
            item.id === editingItemId
              ? {
                  ...item,
                  itemName: formValues.itemName,
                  quantity: parseInt(formValues.quantity),
                  expirationDate: formValues.expirationDate,
                }
              : item
          ) ?? [],
      };
    });
    setEditingItemId(null);
  };

  const rows = groceryList?.items?.map((item) => (
    <Table.Row
      key={item.id}
      // data-selected adds a custom HTML attribute if row's itemName is in the selection array - so the table rows have data-selected only when selected
      // if row is selected, data selected will be "" meaning it exists, otherwise undefined. react will omit attributes with undefined values
      data-selected={selection.includes(item.itemName) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          mt="0.5"
          aria-label="Select row"
          // boolean to check if row is selected
          checked={selection.includes(item.itemName)}
          // when user toggles checkbox, update selection array if changes.checked is true, otherwise remove from array
          onCheckedChange={(changes) => {
            setSelection(
              (prev) =>
                // this checkbox don't pass a boolean, it passes an object with a checked property that could be true or false - hence changes.checked
                changes.checked
                  ? [...prev, item.itemName] // if checked add item
                  : selection.filter((name) => name !== item.itemName) // it not checked remove item from selection
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
            // Only opens if editingItemId matches the current row’s ID.
            open={editingItemId === item.id}
            // onOpenChange: if the popover closes (isOpen = false), clear editingItemId
            onOpenChange={(isOpen) => {
              if (!isOpen) setEditingItemId(null);
            }}
          >
            <Popover.Trigger asChild>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditClick(item)}
              >
                Edit
              </Button>
            </Popover.Trigger>
            {/* Portal renders popover outside normal DOM flow so it's positioned correctly relative to the trigger */}
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

                      <Button onClick={handleSave}>Save</Button>
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

  // ==== ADD TO REFRIGERATOR SECTION ====
  const [refrigerators, setRefrigerators] = useState<Refrigerator[]>([]);
  const [selectedFridgeId, setSelectedFridgeId] = useState<number | null>(null);

  useEffect(() => {
    const getRefrigerators = async () => {
      if (!authData?.token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/refrigerators`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.message || "Failed to fetch refrigerators");
        }
        setRefrigerators(data);
      } catch (error) {
        console.error("Error fetching refrigerators:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load refrigerators"
        );
      }
    };

    getRefrigerators();
  }, [authData]);

  const handleAddToRefrigerator = async () => {
    // Validation checks
    if (!selectedFridgeId) {
      setError("Please select a refrigerator first");
      return;
    }

    if (!selection.length) {
      setError("Please select at least one item");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Get the full item objects for selected items
      const selectedItemIds =
        groceryList?.items
          ?.filter((item) => selection.includes(item.itemName))
          .map((item) => item.id) ?? [];

      const response = await fetch(
        `${API_BASE_URL}/refrigerators/${selectedFridgeId}/items`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.token}`,
          },
          body: JSON.stringify(selectedItemIds),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || "Failed to add items");
      }

      // Clear selection on success
      setSelection([]);
    } catch (error) {
      console.error("Error adding items:", error);
      setError(error instanceof Error ? error.message : "Failed to add items");
    } finally {
      setIsLoading(false);
    }
  };

  const fridgeCollection = createListCollection({
    items: refrigerators.map((fridge) => ({
      label: fridge.fridgeName,
      value: fridge.id.toString(),
    })),
  });

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
        <Heading size="2xl">{groceryList?.listName}</Heading>
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
                  // this code handles the select all checkbox "root"
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked
                        ? groceryList?.items?.map((item) => item.itemName) ?? []
                        : []
                      // ?? [] (nullish coalescing operator) ensures we always return an array, even if groceryList or items is undefined
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
        <br></br>

        <Flex gap={4} align="center" mt={4} width="400px">
          <Select.Root
            collection={fridgeCollection}
            size="sm"
            onValueChange={(value) => setSelectedFridgeId(Number(value.value))}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={"Select a refrigerator"} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {fridgeCollection.items.map((fridge) => (
                    <Select.Item key={fridge.value} item={fridge}>
                      {fridge.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          {/* Add to Refrigerator Button */}
          <Button
            w="200px"
            onClick={handleAddToRefrigerator}
            disabled={!selection.length || !selectedFridgeId}
          >
            Add to Refrigerator
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default GroceryList;
