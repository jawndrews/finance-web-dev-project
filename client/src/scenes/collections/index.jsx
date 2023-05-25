import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Collections = () => {
  useEffect(() => {
    document.title = "Collections | Fisca";
  }, []);
  return (
    <Box m="2rem 2.5rem">
      <Header title="Collections" subtitle="Contact Your Collections Agency" />
    </Box>
  );
};

export default Collections;
