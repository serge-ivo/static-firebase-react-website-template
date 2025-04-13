import {
  Box,
  Button,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserRepository } from "../../repositories/userRepository";
import { UserData } from "../../models/user";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth to check ownership

const UserProfileEditPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<Partial<UserData>>({}); // Use Partial for editable fields
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Fetch existing user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      if (currentUser?.uid !== userId) {
        setError("You are not authorized to edit this profile.");
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
          // Initialize with empty values if profile doesn't exist yet
          // Keep email from auth if available
          setUserData({ email: currentUser?.email || "" });
          // setError("User profile data not found. Creating new profile."); // Or inform user
        }
      } catch (err) {
        console.error("Error fetching user profile data:", err);
        setError("Failed to load user profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, currentUser]);

  // Use useCallback for the change handler to avoid redefining it on every render
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUserData((prevData) => ({ ...prevData, [name]: value }));
    },
    []
  );

  const handleSave = async () => {
    if (!userId) {
      setError("User ID is missing.");
      return;
    }
    if (currentUser?.uid !== userId) {
      setError("You are not authorized to save this profile.");
      return;
    }

    setSaving(true);
    setError(null);
    setSaveSuccess(false);
    try {
      // Prepare data, excluding fields that shouldn't be directly saved (like id)
      // Use 'in' operator to safely check for createdAt existence
      const existingCreatedAt =
        "createdAt" in userData ? userData.createdAt : undefined;
      const { id, ...dataToSave } = userData as Partial<UserData> & {
        id?: string;
      };

      // Ensure updatedAt is set
      dataToSave.updatedAt = new Date();

      // If creating (no existing createdAt timestamp), set it
      if (!existingCreatedAt) {
        dataToSave.createdAt = new Date();
      }

      // Cast to Partial<UserData> for the updateUser function
      await UserRepository.updateUser(userId, dataToSave as Partial<UserData>);
      setSaveSuccess(true);
      // Optionally navigate back after a short delay
      setTimeout(() => navigate(`/user/${userId}`), 1500);
    } catch (err) {
      console.error("Error saving user profile:", err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(userData.createdAt ? `/user/${userId}` : "/"); // Go back to profile if exists, else home
  };

  if (loading) {
    return (
      <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
    );
  }

  // Show error if loading failed and no data is available, or if unauthorized
  if (error && !Object.keys(userData).length) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }
  if (currentUser?.uid !== userId && !loading) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        You are not authorized to edit this profile.
      </Alert>
    );
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ maxWidth: 600, margin: "auto", p: 2 }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: "center" }}>
        Edit Profile
      </Typography>

      {error && !saveSuccess && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Profile saved successfully!
        </Alert>
      )}

      {/* --- Standard Text Fields --- */}
      <TextField
        label="First Name"
        name="firstName" // Ensure name matches UserData key
        value={userData.firstName || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={userData.lastName || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={userData.email || ""}
        // Email might be non-editable or require verification flow
        // onChange={handleChange}
        InputProps={{
          readOnly: true, // Make email read-only for this example
        }}
        fullWidth
        margin="normal"
        disabled={saving}
        helperText="Email cannot be changed here."
      />
      <TextField
        label="Location (City, State)"
        name="location"
        value={userData.location || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="Country"
        name="country"
        value={userData.country || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="Website URL"
        name="website"
        type="url"
        value={userData.website || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="LinkedIn Profile URL"
        name="linkedin"
        type="url"
        value={userData.linkedin || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        disabled={saving}
      />
      <TextField
        label="Bio / About Me"
        name="bio"
        value={userData.bio || ""}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        disabled={saving}
      />
      <TextField
        label="OpenAI API Key"
        name="openAIKey"
        value={userData.openAIKey || ""}
        onChange={handleChange}
        type="password" // Hide the key
        fullWidth
        margin="normal"
        disabled={saving}
        helperText="Stored securely (example only, handle with care)"
      />

      {/* --- Image Uploader Placeholder --- */}
      <Box sx={{ my: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Profile Picture
        </Typography>
        {/* 
          Placeholder for Image Uploader Component.
          This would typically involve:
          1. An input type="file" to select an image.
          2. Uploading the selected file to Firebase Storage (using getStorage, ref, uploadBytesResumable).
          3. Getting the download URL after upload (getDownloadURL).
          4. Saving the download URL to the 'photoURL' field in the user's Firestore document.
          5. Displaying the current userData.photoURL in an <Avatar> or <img> tag.
        */}
        <Typography variant="body2" color="text.secondary">
          (Image uploader component not implemented in this refactor)
        </Typography>
        {userData.photoURL && (
          <Box mt={1}>
            <Typography variant="caption">Current Image:</Typography>
            <img
              src={userData.photoURL}
              alt="Profile"
              style={{ maxWidth: "100px", display: "block", marginTop: "5px" }}
            />
          </Box>
        )}
      </Box>

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Keep space between
          marginTop: 4,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving ? <CircularProgress size={24} /> : "Save Profile"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfileEditPage;
