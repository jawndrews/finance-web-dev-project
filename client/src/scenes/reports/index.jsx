import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Reports = () => {
  useEffect(() => {
    document.title = "Reports | Everdant";
  }, []);

  return (
    <Box m="2rem 2.5rem">
      <Header title="Reports" subtitle="Generate Downloadable Reports" />
    </Box>
  );
};

export default Reports;
