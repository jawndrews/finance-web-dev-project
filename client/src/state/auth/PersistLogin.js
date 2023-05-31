import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { usePersist } from "hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Link, Box, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const theme = useTheme();
  const { palette } = useTheme();
  const navigate = useNavigate();

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUnitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    console.log("loading");
    content = (
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress>
          <p>Loading...</p>
        </CircularProgress>
      </Box>
    );
  } else if (isError) {
    console.log("Unauthorized");
    navigate("/login");
    content = (
      <Box display="block" alignItems="center" width="100%">
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            display="flex"
            sx={{
              fontSize: "2rem",
              m: "2rem",
              color: theme.palette.accent[400],
            }}
          >
            Something went wrong.
          </Typography>
          <Box>
            <Link
              href="/login"
              sx={{
                fontSize: "1rem",
                color: theme.palette.primary[100],
                "&:hover": {
                  color: theme.palette.secondary[300],
                },
              }}
            >
              <Typography sx={{ m: "2rem" }}>Please login.</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    );
  } else if (isSuccess && trueSuccess) {
    console.log("success");
    content = <Outlet />;
  } else if (token && isUnitialized) {
    console.log("token and uninit");
    console.log(isUnitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
