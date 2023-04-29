import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Communication = () => {
  useEffect(() => {
    document.title = "Communication | Fisca";
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COMMUNICATION" subtitle="Contact Your Members" />
    </Box>
  );
};

export default Communication;
