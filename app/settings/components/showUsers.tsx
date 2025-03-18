import { Flex, Button, Text, Skeleton, Box, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { getUsersProfiles, sendFriendRequest } from "@/app/actions";
import { User } from "@/components/providers/ProviderUser";
import { Input } from "@/components/ui/input";
import { FiPlusCircle } from "react-icons/fi";
import { MouseEvent } from "react";

interface ShowUsersProps {
  user: User;
}

export default function ShowUsers({ user }: ShowUsersProps) {
  const [usersProfile, setUsersProfile] = useState<User[] | null>(null);
  const [originalUsersProfile, setOriginalUsersProfile] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const toast = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getUsersProfiles();
      setUsersProfile(data);
      setOriginalUsersProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function handleFindUser(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (!value) {
      setUsersProfile(originalUsersProfile);
      return;
    }

    const findUser: User[] = originalUsersProfile
      ? originalUsersProfile.filter((user) =>
        user.username.toLowerCase().includes(value.toLowerCase())
      )
      : [];

    setUsersProfile(findUser);
  }

  const handleAddFriend = async (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    try {
      const response = await sendFriendRequest(id);
      if (response) {
        setUsersProfile((prevUsers) =>
          prevUsers
            ? prevUsers.map((profile) =>
              profile.user_id === id
                ? {
                  ...profile,
                  received_friend_requests: profile.received_friend_requests
                    ? [...profile.received_friend_requests, { sender_id: user.user_id, receiver_id: id, status: "pending" }]
                    : [{ sender_id: user.user_id, receiver_id: id, status: "pending" }],
                }
                : profile
            )
            : null
        );
        toast({
          title: "Friend request sent.",
          description: "Your friend request was sent successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast({
        title: "Error sending friend request.",
        description: "There was an error processing your request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" direction="column" gap={3}>
      {!showUsers ? (
        <Button
          onClick={() => {
            setShowUsers(true);
            if (!usersProfile) {
              fetchData();
            }
          }}
        >
          Show Users
        </Button>
      ) : (
        <>
          <Button onClick={() => setShowUsers(false)}>Hide Users</Button>
          <Input
            onChange={handleFindUser}
            name="text"
            type="text"
            placeholder="Search User..."
          />
        </>
      )}

      {showUsers && (
        <Flex direction="column" gap={2} align="center">
          {loading ? (
            <Box>
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} height="20px" width="200px" className="mt-2" />
              ))}
            </Box>
          ) : usersProfile && usersProfile.length > 0 ? (
            usersProfile.map((profile) => {
              const hasSentRequest = profile.received_friend_requests?.some(
                (req) => req.sender_id === user.user_id
              );
            
              const hasReceivedRequest = profile.sent_friend_requests?.some(
                (req) => req.receiver_id === user.user_id
              );

              return (
                <Text className="flex items-center gap-3" key={profile.id}>
                  {profile.username}
                  {hasReceivedRequest ? (
                    <Button>
                      Rispondi alla richiesta
                    </Button>
                  ) : hasSentRequest ? (
                    <Text as='span'>Richiesta inviata</Text>
                  ) : (
                    <Button
                      onClick={(e) => handleAddFriend(e)}
                      id={profile.user_id}
                      leftIcon={<FiPlusCircle className="cursor-pointer" />}
                    >
                      Add friend
                    </Button>
                  )}
                </Text>
              );
            })
          ) : (
            <Text>No users found.</Text>
          )}
        </Flex>
      )}
    </Flex>
  );
}
