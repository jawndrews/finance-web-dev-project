import { useState, useEffect } from "react";
import { Box, useTheme, Button, Alert, AlertTitle } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuth from "hooks/useAuth";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";

const AddMembers = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();

  const { organization } = useAuth();

  useEffect(() => {
    document.title = "Import Members | MemberMint";
  }, []);

  const handleBackButton = () => {
    navigate("/members");
  };

  const handleSingleMemberButton = () => {
    navigate("/members/create/single");
  };

  return (
    <Box m="2rem 2.5rem">
      <FlexBetween>
        <Header title="Add Members" subtitle="" />
        <Box>
          <Button
            onClick={handleBackButton}
            sx={{
              color: theme.palette.secondary[300],
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.secondary[600]
                    : theme.palette.secondary[700],
              },
            }}
          >
            <ArrowBackIcon sx={{}} />
          </Button>
        </Box>
      </FlexBetween>

      <FlexBetween
        mt="1rem"
        style={{
          justifyContent: "flex-start",
          gridColumn: "span 4",
        }}
        gap="2rem"
      >
        <Button
          onClick={handleSingleMemberButton}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.accent[400],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "5px 10px",
            "&:hover": {
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[500]
                  : theme.palette.accent[200],
            },
          }}
        >
          Single Member
        </Button>
        <Button
          sx={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.grey[50]
                : theme.palette.grey[50],
            backgroundColor:
              theme.palette.mode === "dark"
                ? theme.palette.accent[500]
                : theme.palette.accent[400],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "5px 10px",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.accent[500]
                  : theme.palette.accent[400],
            },
          }}
        >
          Import Members with CSV
        </Button>
      </FlexBetween>
      <Alert severity="info" variant="outlined" sx={{ mt: "3rem" }}>
        <AlertTitle>We're sorry, this feature is not yet available.</AlertTitle>
        We are working hard to bring you the best experience possible. Please
        check back later.
      </Alert>
    </Box>
  );
};

export default AddMembers;
