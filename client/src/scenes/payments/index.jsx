import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPaymentsQuery } from "state/api";
import { Box, useTheme } from "@mui/material";

const Payments = () => {
  const theme = useTheme();

  // values sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetPaymentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("data", data);

  return <div>Payments</div>;
};

export default Payments;
