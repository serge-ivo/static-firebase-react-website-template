import React from "react";
import { Box } from "@mui/material";
import backgroundImage from "./../../assets/background.jpg"; // Adjust path as needed

const Background: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "brightness(0.7)", // Slightly dim the image for better readability
      }}
    />
  );
};

export default Background;
