import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Transactions = () => {
  useEffect(() => {
    document.title = "Transactions | Fisca";
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="View Transaction History" />
    </Box>
  );
};

export default Transactions;
