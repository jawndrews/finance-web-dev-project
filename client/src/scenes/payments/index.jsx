import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPaymentsQuery } from "state/api";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useEffect } from "react";

const Payments = () => {
  const theme = useTheme();
  // values sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetPaymentsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  useEffect(() => {
    document.title = "Payments | MemberMint";
  }, []);

  function getFullName(params) {
    const user = params.row.userId[0];
    if (!user) {
      return "";
    }
    return `${user.firstName || ""} ${user.lastName || ""}`;
  }

  function getRemainingBalance(params) {
    //negative balances
    let remainingBalance = params.row.invoiceId[0].amount - params.row.amount;

    const formattedBalance = remainingBalance.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (remainingBalance < 0) {
      return "$0.00"; //update in future if international currencies are needed
    } else {
      return `${formattedBalance || ""}`;
    }
  }

  const columns = [
    {
      field: "userId",
      headerName: "Member",
      flex: 1,
      valueGetter: getFullName,
    },
    {
      field: "createdAt",
      headerName: "Payment Date",
      flex: 1,
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
      //valueFormatter: (params) =>
      //  (params?.value).charAt(0).toUpperCase() + (params?.value).slice(1),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) => `$${(params?.value).toFixed(2)}`,
    },
    {
      field: "invoiceId",
      headerName: "Remaining Balance",
      flex: 1,
      valueGetter: getRemainingBalance,
    },
  ];

  return (
    <Box m="2rem 2.5rem">
      <Header title="Payments" subtitle="Payments Made by Your Members" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.primary[600],
            borderBotton: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.primary[600],
            borderTop: "none",
          },
          "& .MuiButton-text": {
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.primary[600],
          },
          "& .MuiButton-text:hover": {
            color: theme.palette.secondary[300],
          },
          "& .MuiDataGrid-main": {},
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.payments) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Payments;
