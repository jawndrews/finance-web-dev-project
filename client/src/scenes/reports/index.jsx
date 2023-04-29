import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Reports = () => {
  useEffect(() => {
    document.title = "Reports | Fisca";
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="REPORTS" subtitle="Generate Downloadable Reports" />
    </Box>
  );
};

export default Reports;
