import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  ".MuiDialog-paper": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "0 auto",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: theme.palette.text.primary,
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.primary,
    },
  },
}));

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onResetPassword: () => void;
  isLinkSent: boolean;
  timer: number;
  errorMessage?: string | null;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  email,
  onEmailChange,
  onResetPassword,
  isLinkSent,
  timer,
  errorMessage,
}) => {
  const theme = useTheme();

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Box textAlign="center">
          <LockOutlinedIcon
            style={{
              fontSize: "80px",
              marginBottom: "20px",
              color: theme.palette.text.disabled,
            }}
          />
        </Box>
        <Typography variant="body1" textAlign="center" marginBottom={2}>
          Enter your email address, and we'll send you a link to reset your
          password. You can request a new link every 30 seconds.
        </Typography>
        <StyledTextField
          margin="dense"
          id="resetEmail"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={onEmailChange}
          placeholder="Your email here"
        />
        {errorMessage && (
          <Typography
            variant="body2"
            textAlign="center"
            color="error"
            fontWeight={700}
            fontSize={16}
            marginTop={2}
            marginBottom={2}
          >
            {errorMessage}
          </Typography>
        )}

        {isLinkSent && (
          <Button
            variant="contained"
            color="success"
            disabled
            style={{
              width: "100%",
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              marginTop: 4,
              opacity: 0.7,
            }}
          >
            <>
              <span>Reset link sent</span>
              <Typography
                variant="body2"
                style={{
                  color: theme.palette.success.contrastText,
                  fontSize: "1rem",
                }}
              >
                00:{timer < 10 ? `0${timer}` : timer}
              </Typography>
            </>
          </Button>
        )}
      </DialogContent>
      <DialogActions
        style={{ justifyContent: "center", padding: "0 24px 24px" }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          style={{
            marginRight: "10px",
            flex: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onResetPassword}
          variant="contained"
          color="primary"
          style={{
            flex: 1,
          }}
          disabled={isLinkSent}
        >
          {isLinkSent ? "Link Sent" : "Send Reset Link"}
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ResetPasswordModal;
