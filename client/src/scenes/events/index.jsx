import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    document.title = "Events | Everdant";
  }, []);
  return (
    <Box m="2rem 2.5rem">
      <Header title="Events" subtitle="View and Schedule Events" />
    </Box>
  );
};

export default Events;
