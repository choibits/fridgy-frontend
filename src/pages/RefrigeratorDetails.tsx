import { type JSX, useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import type { Refrigerator, Item } from "../types";
import {
  Flex,
  Heading,
  Table,
  Box,
  Text,
  Button,
  Portal,
  Popover,
  Checkbox,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../config";

const RefrigeratorDetails = (): JSX.Element => {
  const [refrigerator, setRefrigerator] = useState<Refrigerator | null>(null);
  const [error, setError] = useState<string>("");
  const [selection, setSelection] = useState<string[]>([]);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [formValues, setFormValues] = useState({
    itemName: "",
    quantity: "",
    expirationDate: "",
  });

  const { authData } = useContext(AuthContext);
  const { id: fridgeId } = useParams();

  useEffect(() => {
    if (authData?.token && fridgeId) {
      getRefrigerator();
    }
  }, [authData, fridgeId]);

  const getRefrigerator = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/refrigerators/${fridgeId}`,
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
          setError("Get refrigerator call failed. Please try again.");
        }
        return;
      }
      setRefrigerator(data);
      console.log(data);
    } catch (error) {
      console.error("Error getting refrigerator:", error);
      if (error instanceof Error) {
        setError("Error getting refrigerator. Please try again.");
        console.log(error.message);
      } else {
        setError("Error getting refrigerator... Please try again.");
      }
    }
  };

  const handleDeleteItem = async (itemId: number | undefined) => {
    if (itemId === undefined) return;
    try {
      const response = await fetch(
        `${API_BASE_URL}/refrigerators/${fridgeId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authData?.token}`,
          },
        }
      );
      console.log(response);
      setRefrigerator((prevState) => {
        if (prevState) {
          const updatedItems = prevState?.items?.filter(
            (item) => item.id !== itemId
          );
          return { ...prevState, items: updatedItems };
        }
        return prevState;
      });
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

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
      const response = await fetch(`${API_BASE_URL}/items/${editingItemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData?.token}`,
        },
        body: JSON.stringify({
          itemName: formValues.itemName,
          quantity: parseInt(formValues.quantity),
          expirationDate: formValues.expirationDate,
        }),
      });
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
    setRefrigerator((prev) => {
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

  const indeterminate =
    selection.length > 0 &&
    refrigerator?.items &&
    selection.length < refrigerator.items.length;

  const rows = refrigerator?.items?.map((item) => (
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
        <Heading size="2xl">{refrigerator?.fridgeName}</Heading>

        <Box
          display="flex"
          justifyContent="center"
          alignSelf="center"
          minH="10vh"
          minW="50vw"
          p={4}
        >
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
                        changes.checked
                          ? refrigerator?.items?.map((item) => item.itemName) ??
                              []
                          : []
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
        </Box>

        {error && (
          <Text mt={4} color="red.500">
            {error}
          </Text>
        )}
      </Flex>
    </>
  );
};

export default RefrigeratorDetails;
