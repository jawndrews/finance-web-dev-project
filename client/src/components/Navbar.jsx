import React, { useState, useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  ExitToAppOutlined,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import useAuth from "hooks/useAuth";
import { useSendLogoutMutation } from "state/auth/authApiSlice";
import profileImage from "assets/pfp.jpeg";
import {
  Box,
  Typography,
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

const Navbar = ({ user, setCollapsed, collapsed }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { firstName, lastName, userType } = useAuth();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (isSuccess) navigate("/login");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left */}
        <FlexBetween>
          <IconButton onClick={toggleCollapse}>
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            ml="1rem"
            gap="2rem"
            p="0.1rem 0.7rem 0.1rem 1.2rem "
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* right */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {firstName} {lastName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              sx={{
                "& .MuiPaper-root": {
                  // Targeting the Paper component inside the Menu
                  boxShadow: "1px 1px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <MenuItem onClick={""}>
                <Button
                  title="My Account"
                  sx={{
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.accent[300]
                          : theme.palette.accent[400],
                    },
                  }}
                >
                  My Account
                </Button>
              </MenuItem>
              <MenuItem onClick={""}>
                <Button
                  title="My Organization"
                  sx={{
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.accent[300]
                          : theme.palette.accent[400],
                    },
                  }}
                >
                  My Organization
                </Button>
              </MenuItem>
              <Divider />
              <MenuItem onClick={""}>
                <Button
                  title="Help & Feedback"
                  sx={{
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.accent[300]
                          : theme.palette.accent[400],
                    },
                  }}
                >
                  Help & Feedback
                </Button>
              </MenuItem>
              <Divider />
              <MenuItem onClick={onLogoutClicked}>
                <Button
                  title="Logout"
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "#D6685C" : "#D05244",
                    "&:hover": {},
                  }}
                >
                  {"Log Out"}
                </Button>
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
