import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import UserDetails from "./UserDetails";
// import UserOrganizations from "./UserOrganizations";

interface UserDetailsDialogProps {
  userId: string;
  onClose: () => void;
}

const UserDetailsDialog: React.FC<UserDetailsDialogProps> = ({
  userId,
  onClose,
}) => {
  const { currentUser } = useAuthContext();
  const [loadingUserDetails, setLoadingUserDetails] = useState<boolean>(true);
  const [loadingOrgs, setLoadingOrgs] = useState<boolean>(true);
  const [loadingAdminOrgs, setLoadingAdminOrgs] = useState<boolean>(true);

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>User Details</DialogTitle>
      <DialogContent>
        {/* User Details Section */}
        <UserDetails userId={userId} />

        {/* User Organizations Section */}
        {/* <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Organizations
          </Typography>
          <UserOrganizations userId={userId} setLoading={setLoadingOrgs} />
        </Box> */}

        {/* Admin Organizations Section */}
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Invite to Your Organizations
          </Typography>
          {/* {currentUser ? (
            <AdminOrganizations
              currentUserId={currentUser.uid} // Pass currentUserId instead of currentUser
              userId={userId}
              setLoading={setLoadingAdminOrgs}
            />
          ) : (
            <Typography>Loading...</Typography>
          )} */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsDialog;
