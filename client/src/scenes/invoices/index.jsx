import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetInvoicesQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

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

  function getFullName(params) {
    const user = params.row.userId[0];
    if (!user) {
      return "";
    }
    return `${user.firstName || ""} ${user.lastName || ""}`;
  }

  useEffect(() => {
    document.title = "Invoices | Fisca";
  }, []);

  const columns = [
    {
      field: "userId",
      headerName: "Member",
      flex: 1,
      valueGetter: getFullName,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      flex: 1,
      valueFormatter: (params) => new Date(params?.value).toLocaleString(),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) => `$${(params?.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="INVOICES" subtitle="Send and View Invoice History" />
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
            color: theme.palette.secondary[100],
            borderBotton: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiButton-text": {
            color: theme.palette.primary[300],
          },
          "& .MuiButton-text:hover": {
            color: theme.palette.secondary[300],
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.invoices) || []}
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
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Invoices;
