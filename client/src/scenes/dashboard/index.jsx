import React from "react";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DownloadOutlined,
  PersonAdd,
  Paid,
  CalendarMonth,
  Description,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import { useEffect } from "react";
import LineChart from "components/LineChart";
import { useState } from "react";
import PieChart from "components/PieChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const { data, isLoading } = useGetDashboardQuery();

  function getFullName(params) {
    const user = params.row.userId[0];
    if (!user) {
      return "";
    }
    return `${user.firstName || ""} ${user.lastName || ""}`;
  }

  function formatCurrency(amount, locale = "en-US", currency = "USD") {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  useEffect(() => {
    document.title = "Dashboard | MemberMint";
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Member ID",
      flex: 1,
      //valueGetter: getFullName,
    },
    {
      field: "paymentType",
      headerName: "Payment Type",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];
  return (
    <Box m="2rem 2.5rem">
      <FlexBetween>
        <Header title="Dashboard" subtitle="Welcome to Your Dashboard" />
        <Box>
          <Button
            sx={{
              color: theme.palette.secondary[300],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              ml: "35px",
              mt: "6px",
              "&:hover": {
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary[200]
                    : theme.palette.secondary[500],
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "15px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Members"
          value={data && data.totalMembers}
          increase="+14%"
          description="Since last month"
          backgroundColor="#68B8DC"
          color={theme.palette.grey[900]}
          statColor={theme.palette.grey[900]}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.grey[900], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Monthly Income"
          value={data && formatCurrency(data.monthlyIncome)}
          increase="+8%"
          description="Since last month"
          backgroundColor="#75D0DB"
          color={theme.palette.grey[900]}
          statColor={theme.palette.grey[900]}
          icon={
            <CalendarMonth
              sx={{ color: theme.palette.grey[900], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Total Income"
          value={data && formatCurrency(data.totalIncome)}
          increase="+21%"
          description="Since last month"
          backgroundColor="#97EBED"
          color={theme.palette.grey[900]}
          statColor={theme.palette.grey[900]}
          icon={
            <Paid sx={{ color: theme.palette.grey[900], fontSize: "26px" }} />
          }
        />
        <StatBox
          title="Total Outstanding"
          value="16" //{data && data.totalOutstandingInvoices}
          increase="-13%"
          description="Since last month"
          backgroundColor="#D8E641"
          color={theme.palette.grey[900]}
          statColor={theme.palette.grey[900]}
          icon={
            <Description
              sx={{ color: theme.palette.grey[900], fontSize: "26px" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {/*Income*/}
          </Typography>
          <LineChart />
        </Box>

        {/*MAKE ANOTHER DATA VIS TYPE FOR THIS*/}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            {/*Income*/}
          </Typography>
          <LineChart />
        </Box>

        <Box
          boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
          gridColumn="span 8"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-main": {
              borderRadius: "0.55rem 0.55rem 0rem 0rem",
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
              borderBottom: "none",
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
              borderRadius: "0rem 0rem 0.55rem 0.55rem",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.recentPayments) || []}
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
          />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          boxShadow="1px 1px 30px rgba(0,0,0,0.1)"
        >
          <Typography
            variant="h6"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[50]
                  : theme.palette.primary[600],
            }}
          >
            Income by Category
          </Typography>
          <PieChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : theme.palette.grey[600],
            }}
            textAlign="center"
          >
            Payments categorized by invoice description
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
