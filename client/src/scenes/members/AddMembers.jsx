import { useRef, useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  TextField,
  Typography,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import useAuth from "hooks/useAuth";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { states } from "config/states.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";

const AddMembers = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();

  const { organization } = useAuth();
  const [open, setOpen] = useState(true);
  const { userObject, setUserObject } = useState();

  useEffect(() => {
    document.title = "Add Members | Everdant";
  }, []);

  const handleBackButton = () => {
    navigate("/members");
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    dob: "",
    organization: { organization },
    active: true,
    memberEndDate: "",
    userType: "user",
  };

  const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.string(),
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    dob: yup.string(),
    active: yup.string().required("*required"),
    userType: yup.string().required("required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleImportButton = () => {
    navigate("/members/create/import");
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
          Single Member
        </Button>
        <Button
          onClick={handleImportButton}
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
          Import Members with CSV
        </Button>
      </FlexBetween>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="2rem"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                " & > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Typography marginTop="2rem" sx={{ gridColumn: "span 4" }}>
                Contact Info
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  value={values.dob}
                  variant="filled"
                  label="Date of Birth"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="dob"
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 2" }}
                />
              </LocalizationProvider>
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Permissions*
                </InputLabel>
                <Select
                  id="userType-selector"
                  value={values.userType}
                  variant="filled"
                  label="Permissions"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="userType"
                  error={!!touched.dob && !!errors.dob}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 1" }}
                >
                  <MenuItem value="user">Member</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Typography marginTop="2rem" sx={{ gridColumn: "span 4" }}>
                Address
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Street"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street}
                name="street"
                error={!!touched.street && !!errors.street}
                helperText={touched.street && errors.street}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                fullWidth
                options={states}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    variant="filled"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                  />
                )}
                freeSolo
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Zip"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zip}
                name="zip"
                error={!!touched.zip && !!errors.zip}
                helperText={touched.zip && errors.zip}
                sx={{ gridColumn: "span 2" }}
              />
              {/*<TextField
                fullWidth
                variant="filled"
                label="Country"
                select
                value={values.country}
                name="country"
                onChange={handleChange}
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 4" }}
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: "30rem",
                    },
                  },
                }}
              >
                <MenuItem value="United States">United States</MenuItem>
              </TextField>*/}

              <FlexBetween
                style={{
                  justifyContent: "flex-start",
                  gridColumn: "span 4",
                }}
              >
                <Button
                  className="form_submit-button"
                  type="submit"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.secondary[400]
                        : theme.palette.secondary[600],
                    color:
                      theme.palette.mode === "dark"
                        ? theme.palette.secondary[900]
                        : theme.palette.secondary[100],
                    p: "1rem",
                    width: "150px",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? theme.palette.secondary[300]
                          : theme.palette.secondary[700],
                    },
                  }}
                >
                  {"SUBMIT"}
                </Button>
              </FlexBetween>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddMembers;
