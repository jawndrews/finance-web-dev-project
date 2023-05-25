import React, { useState } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { useGetUsersQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import FlexBetween from "components/FlexBetween";
import { useEffect } from "react";

const Members = () => {
  const theme = useTheme();
  // values sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetUsersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("members data", data);

  function getFullName(params) {
    return `${params.row.firstName || ""} ${params.row.lastName || ""}`;
  }

  useEffect(() => {
    document.title = "Members | Fisca";
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 0.75,
    },
    {
      field: "firstName",
      headerName: "Name",
      flex: 0.7,
      valueGetter: getFullName,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.7,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    {
      field: "userType",
      headerName: "Permissions",
      flex: 0.5,
      //valueFormatter: (params) =>
      //  (params?.value).charAt(0).toUpperCase() + (params?.value).slice(1),
    },
  ];

  return (
    <Box m="2rem 2.5rem">
      <FlexBetween>
        <Header title="Members" subtitle="Manage Your Members" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: "35px",
              mt: "6px",
              "&:hover": {
                color: theme.palette.secondary.light,
              },
            }}
          >
            <PersonAdd sx={{ mr: "15px" }} />
            Add Members
          </Button>
        </Box>
      </FlexBetween>
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
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.users) || []}
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

export default Members;
