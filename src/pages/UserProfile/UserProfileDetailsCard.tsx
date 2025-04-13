import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Avatar,
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserRepository } from "../../repositories/userRepository";
import { UserData } from "../../models/user";

interface UserProfileDetailsCardProps {
  userId: string;
}

const normalizeUrl = (url: string): string => {
  if (!url?.startsWith("http://") && !url?.startsWith("https://")) {
    return `https://${url}`;
  }
  return url || "";
};

const UserProfileDetailsCard: React.FC<UserProfileDetailsCardProps> = ({
  userId,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<(UserData & { id: string }) | null>(
    null
  );

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await UserRepository.getUser(userId);
        if (data) {
          setUserData(data);
        } else {
          setError("User profile not found.");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleShare = () => {
    const profileUrl = `${window.location.origin}/user/${userId}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      alert("User profile URL copied to clipboard!");
    });
  };

  const handleEditProfile = () => {
    navigate(`/user/${userId}/edit`);
  };

  if (loading) {
    return (
      <Card sx={{ mb: 4, p: 3 }}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (error && !userData) {
    return (
      <Card sx={{ mb: 4, p: 3 }}>
        <CardContent>
          <Alert severity="error">{error}</Alert>
          {currentUser?.uid === userId && (
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={handleEditProfile}
                sx={{ mr: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }

  const profileName =
    userData?.name ||
    `${userData?.firstName || ""} ${userData?.lastName || ""}`.trim() ||
    "User Profile";
  const displayEmail = userData?.email;
  const displayCountry = userData?.country;
  const displayLocation = userData?.location;
  const displayWebsite = userData?.website;
  const displayLinkedin = userData?.linkedin;
  const displayPhotoURL = userData?.photoURL;
  const displayBio = userData?.bio;

  return (
    <Card sx={{ mb: 4, p: 3 }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar
            src={displayPhotoURL}
            sx={{ width: 56, height: 56, bgcolor: "primary.main" }}
          >
            {profileName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {profileName}
          </Typography>
        </Box>

        {displayEmail && (
          <Typography variant="body1" gutterBottom>
            Email: {displayEmail}
          </Typography>
        )}
        {displayLocation && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Location: {displayLocation}
          </Typography>
        )}
        {displayCountry && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Country: {displayCountry}
          </Typography>
        )}
        {displayBio && (
          <Typography variant="body1" paragraph sx={{ mt: 2 }}>
            {displayBio}
          </Typography>
        )}

        <Box display="flex" flexDirection="column" gap={1} mt={3}>
          {displayWebsite && (
            <MuiLink
              href={normalizeUrl(displayWebsite)}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              variant="body1"
            >
              🌐 Website
            </MuiLink>
          )}
          {displayLinkedin && (
            <MuiLink
              href={normalizeUrl(displayLinkedin)}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              variant="body1"
            >
              🔗 LinkedIn
            </MuiLink>
          )}
        </Box>

        <Box mt={3} display="flex" gap={1}>
          {currentUser?.uid === userId && (
            <Button variant="contained" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          )}
          <Button variant="outlined" onClick={handleShare}>
            Share
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileDetailsCard;
