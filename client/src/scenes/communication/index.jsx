import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Communication = () => {
  useEffect(() => {
    document.title = "Communication | Everdant";
  }, []);

  return (
    <Box m="2rem 2.5rem">
      <Header title="Communication" subtitle="Contact Your Members" />
    </Box>
  );
};

export default Communication;
