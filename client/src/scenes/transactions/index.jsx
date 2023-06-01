import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import Header from "components/Header";
import { useEffect } from "react";

const Transactions = () => {
  useEffect(() => {
    document.title = "Transactions | Everdant";
  }, []);
  return (
    <Box m="2rem 2.5rem">
      <Header title="Transactions" subtitle="View Transaction History" />
      <Alert severity="info" variant="outlined" sx={{ mt: "3rem" }}>
        <AlertTitle>We're sorry, this feature is not yet available.</AlertTitle>
        We are working hard to bring you the best experience possible. Please
        check back later.
      </Alert>
    </Box>
  );
};

export default Transactions;
