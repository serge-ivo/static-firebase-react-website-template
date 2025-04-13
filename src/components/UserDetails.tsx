import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";
import { UserRepository } from "../repositories/userRepository";
import { UserData } from "../models/user";

interface UserDetailsProps {
  userId: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const [userDetails, setUserDetails] = useState<
    (UserData & { id: string }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const userData = await UserRepository.getUser(userId);
        if (userData) {
          setUserDetails(userData);
        } else {
          setError("User details not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <CircularProgress size={24} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userDetails) {
    return <Typography>User details not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="body1">
        <strong>Name:</strong> {userDetails.name || "N/A"}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {userDetails.email || "N/A"}
      </Typography>
    </Box>
  );
};

export default UserDetails;
