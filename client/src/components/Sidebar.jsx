import React from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRightOutlined,
  HomeOutlined,
  PaymentsOutlined,
  GroupsOutlined,
  ReceiptLongOutlined,
  EmailOutlined,
  DescriptionOutlined,
  AssessmentOutlined,
  CalendarMonthOutlined,
  LocalPhoneOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/pfp.jpeg";
import logoColorForDark from "assets/svg/logo-dark-alt.svg";
import logoColorForLight from "assets/svg/logo-light-alt.svg";
import logoIcon from "assets/svg/icon-color.svg";

// nav items
const navItemsAdmin = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  /*{
    text: "Income",
    icon: null,
  },*/
  {
    text: "Payments",
    icon: <PaymentsOutlined />,
  },
  {
    text: "Invoices",
    icon: <DescriptionOutlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  /*{
    text: "Management",
    icon: null,
  },*/
  {
    text: "Members",
    icon: <GroupsOutlined />,
  },
  {
    text: "Events",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Communication",
    icon: <EmailOutlined />,
  },
  {
    text: "Reports",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Collections",
    icon: <LocalPhoneOutlined />,
  },
];

const navItemsUser = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Income",
    icon: null,
  },
  {
    text: "Payments",
    icon: <PaymentsOutlined />,
  },
  {
    text: "Invoices",
    icon: <DescriptionOutlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Members",
    icon: <GroupsOutlined />,
  },
  {
    text: "Events",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Communication",
    icon: <EmailOutlined />,
  },
  {
    text: "Reports",
    icon: <AssessmentOutlined />,
  },
  {
    text: "Collections",
    icon: <LocalPhoneOutlined />,
  },
];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  collapsed,
  setCollapsed,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  //let navItems = [{}];
  let logo = {};

  //if (userType === "admin") {
  //  navItems = navItemsAdmin;
  //}

  if (theme.palette.mode === "light") {
    logo = logoColorForLight;
  } else if (theme.palette.mode === "dark") {
    logo = logoColorForDark;
  }

  // keep track of current path (URL)
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // Toggle collapse
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Define the drawer widths
  let collapsedWidth = 62;
  const expandedWidth = 240;

  if (!isNonMobile) {
    collapsedWidth = 0;
  }
  // mui persistent drawer as sidebar
  return (
    <Box component="nav" boxShadow="1px 1px 30px rgba(0,0,0,0.1)">
      <Drawer
        open={isSidebarOpen}
        variant="permanent"
        anchor="left"
        sx={{
          width: collapsed ? collapsedWidth : expandedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: collapsed ? collapsedWidth : expandedWidth,
            boxSizing: "border-box",
            overflowX: "hidden", // Prevent horizontal scroll
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[200],
            boxShadow: "1px 1px 30px rgba(0,0,0,0.1)",
            "&:hover": {
              width: "240px", // Full width on hover
            },
            ...(collapsed && {
              "&:hover": {
                width: expandedWidth, // Expand on hover
                "& .MuiListItemText-root": {
                  // Show text when hovered
                  display: "block",
                },
              },
            }),
          },
        }}
      >
        <Box width="100%">
          <Box m="1.8rem 1.5rem 1.5rem 1.3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" width="100%">
                <Box
                  component="img"
                  alt="logo"
                  src={logo}
                  width="180px"
                  sx={{ ml: "", objectFit: "contain" }}
                />
              </Box>
              {!isNonMobile && (
                <IconButton onClick={toggleCollapse}>
                  {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
              )}
            </FlexBetween>
          </Box>
          <Box>
            {/* ORGANIZATION NAME, PFP, USER NAME, AND ROLE IN SIDEBAR
            <Divider
              sx={{
                m: "0 0 2rem 0",
              }}
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                fontSize="0.9rem"
                sx={{
                  color: theme.palette.secondary[400],
                }}
              >
                {organization}
            </Typography>
            </Divider>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="110px"
                width="110px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h2"
                fontWeight="bold"
                fontSize="1.4rem"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[50]
                      : theme.palette.primary[600],
                  m: "1.5rem 0 0 0",
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[50]
                      : theme.palette.primary[600],
                  m: "0.4rem 0 1.5rem 0",
                }}
              >
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Typography>
            </Box>*/}
          </Box>
          <List>
            {navItemsAdmin.map(({ text, icon }) => {
              const lcText = text.toLowerCase();
              return (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    mt: "0.5rem",
                    mb: "0.5rem",
                    borderLeft:
                      active === lcText
                        ? `2px solid ${
                            theme.palette.mode === "dark"
                              ? theme.palette.secondary[500]
                              : theme.palette.secondary[400]
                          }`
                        : "transparent",
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText ? "transparent" : "transparent",
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.grey[50]
                          : theme.palette.primary[600],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        mr: collapsed ? 2 : 2, // Remove margin when collapsed, adjust as needed
                        mt: "0.5rem",
                        mb: "0.5rem",
                        ml: "-0.8rem",
                        justifyContent: "center", // Center the icon
                        color:
                          theme.palette.mode === "dark"
                            ? active === lcText
                              ? theme.palette.secondary[500]
                              : theme.palette.grey[50]
                            : active === lcText
                            ? theme.palette.secondary[400]
                            : theme.palette.primary[600],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? active === lcText
                              ? theme.palette.secondary[500]
                              : theme.palette.grey[50]
                            : active === lcText
                            ? theme.palette.secondary[400]
                            : theme.palette.primary[600],
                        whiteSpace: "nowrap",
                      }}
                    />
                    {active === lcText && (
                      <ChevronRightOutlined
                        sx={{
                          ml: "auto",
                          color:
                            theme.palette.mode === "dark"
                              ? theme.palette.secondary[500]
                              : theme.palette.secondary[400],
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
