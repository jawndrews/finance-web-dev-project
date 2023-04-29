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
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
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
import logoColorForDark from "assets/svg/logo-color.svg";
import logoColorForLight from "assets/svg/logo-dark.svg";

// nav items
const navItemsAdmin = [
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
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { firstName, lastName, organization, userType } = useAuth();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  let navItems = {};
  let logo = {};

  if (userType === "admin") {
    navItems = navItemsAdmin;
  }

  if (theme.palette.mode === "light") {
    logo = logoColorForLight;
  } else if (theme.palette.mode === "dark") {
    logo = logoColorForDark;
  }

  // keep track of current path (URL)
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // mui persistent drawer as sidebar
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" width="100%">
                  <Box
                    component="img"
                    alt="logo"
                    src={logo}
                    width="120px"
                    sx={{ ml: "0.5rem", objectFit: "contain" }}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
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
                {/*add functionality to prevent text runoff here */}
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
                  color: theme.palette.secondary[100],
                  m: "1.5rem 0 0 0",
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography
                fontSize="0.8rem"
                sx={{
                  color: theme.palette.secondary[200],
                  m: "0.1rem 0 1.5rem 0",
                }}
              >
                {userType.charAt(0).toUpperCase() + userType.slice(1)}
              </Typography>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[500]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box>
            <Box position="flex" bottom="0rem">
              <Divider sx={{ mt: "auto", mb: 1 }} />
              <Typography
                sx={{
                  m: "1rem 1rem 1rem 1rem",
                  color: theme.palette.secondary[100],
                }}
              >
                Need Help?{" "}
                <Button
                  href="#"
                  alt="submit-a-ticket"
                  sx={{
                    margin: "0 0 0 1rem",
                    color: theme.palette.secondary[100],
                    "&:hover": {
                      color: theme.palette.secondary[100],
                      backgroundColor: theme.palette.accent[600],
                    },
                  }}
                >
                  Submit a ticket
                </Button>
              </Typography>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
