import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
      boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.primary[600],
          }}
        >
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{
          color:
            theme.palette.mode === "dark"
              ? theme.palette.grey[50]
              : theme.palette.primary[600],
        }}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary[400] }}
        >
          {increase}
        </Typography>
        <Typography
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[500]
                : theme.palette.grey[600],
          }}
        >
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
