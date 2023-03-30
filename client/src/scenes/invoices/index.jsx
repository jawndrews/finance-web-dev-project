import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetInvoicesQuery } from "state/api";

const Invoices = () => {
  const theme = useTheme();
  // values sent to the backend NOT IN USE CURRENTLY, SET UP COMPONENT FOR INVOICE DATA GRID
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetInvoicesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("invoice data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="INVOICES" subtitle="Send and View Invoice History" />
    </Box>
  );
};

export default Invoices;
