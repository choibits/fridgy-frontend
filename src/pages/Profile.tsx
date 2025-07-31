import { useEffect, useState, useContext } from "react";
import { Box, Heading, Text, Table, Button, Flex, Link} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

interface Profile {
  id: string; // UUID
  firstName: string;
  lastName: string;
  favoriteFoods?: string;
}

const Profile = () => {
  const { authData } = useContext(AuthContext);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/${authData?.id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${authData?.token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          setError(data?.message || "Failed to load profile");
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (authData?.token) {
      fetchProfile();
    }
  }, [authData]);

  if (!profile) {
    return (
      <Box p={8}>
        <Text>No profile found.</Text>
      </Box>
    );
  }

  return (
    <>
      <Flex as="main" direction="column" align="center" minH="100vh" p={8}>
        <Heading size="2xl">My Profile</Heading>
              <Box
                display="flex"
                justifyContent="center"
                alignSelf="center"
                minW="50vw"
                p={4}
              >
                {/* TODO: Come back and change this to profile info, also need an "if" no profile handling and error handling */}

                {/* <Table.Root size="sm" interactive>
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
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleDelete(fridge.id)}
                          >
                            Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root> */}
                
              </Box>
      </Flex>
    </>
  );
};

export default Profile;
