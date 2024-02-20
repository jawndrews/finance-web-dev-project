import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({
  title,
  value,
  increase,
  icon,
  description,
  backgroundColor,
  color,
  statColor,
}) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 3"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={backgroundColor}
      borderRadius="0.55rem"
      boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{
            color: color,
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
          color: color,
        }}
      >
        {value}
      </Typography>
      <Typography variant="p" fontStyle="italic" sx={{ color: statColor }}>
        {increase} {"  "} {description}
      </Typography>
    </Box>
  );
};

export default StatBox;
