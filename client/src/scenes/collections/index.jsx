import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Collections = () => {
  useEffect(() => {
    document.title = "Collections | Fisca";
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COLLECTIONS" subtitle="Contact Your Collections Agency" />
    </Box>
  );
};

export default Collections;
