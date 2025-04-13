import { Box, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import ContactDetailsCard from "./UserProfileDetailsCard";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        // Check if the profile belongs to the current user
        setIsCurrentUser(currentUser?.uid === userId);
      } catch (err) {
        console.error("Error fetching user profile details:", err);
        setError("Failed to fetch user profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, currentUser]);

  if (loading) {
    return (
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!userId) {
    return (
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h6">
          User profile details not available.
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 10,
      }}
    >
      <Container sx={{ marginTop: 4, paddingBottom: 4, overflowY: "auto" }}>
        <ContactDetailsCard userId={userId} />
        {/* <UserInterviewsSection userId={userId} /> */}
      </Container>
    </Box>
  );
};

export default UserProfilePage;
