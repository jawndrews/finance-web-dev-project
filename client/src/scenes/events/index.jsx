import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Events = () => {
  useEffect(() => {
    document.title = "Events | Fisca";
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="EVENTS" subtitle="View and Schedule Events" />
    </Box>
  );
};

export default Events;
