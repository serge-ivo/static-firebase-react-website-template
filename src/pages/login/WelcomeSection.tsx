import React from "react";
import { Box, Typography } from "@mui/material";
import { APP_TITLE } from "../../config";

const WelcomeSection: React.FC = () => {
  return (
    <Box sx={{ flex: 1, textAlign: "center", p: 2 }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Orbitron', sans-serif",
          color: "white",
          mb: 2,
        }}
      >
        {APP_TITLE}
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "white", opacity: 0.8, fontStyle: "italic" }}
      >
        Your AI-ready starter template
      </Typography>
    </Box>
  );
};

export default WelcomeSection;
