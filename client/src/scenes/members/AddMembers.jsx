import { useRef, useState, useEffect } from "react";
import {
  Box,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
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
  const { organization } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

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
    userType: "",
  };

  const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.string().required("required"),
    street: yup.string().required("required"),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    zip: yup.string().required("required"),
    country: yup.string().required("required"),
    dob: yup.string().required("required"),
    active: yup.string().required("required"),
    userType: yup.string().required("required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
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
                Member Info
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
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
                label="Last Name"
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
                label="Email"
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
              <TextField
                fullWidth
                variant="filled"
                label="State"
                select
                value={values.state}
                name="state"
                onChange={handleChange}
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 2" }}
                SelectProps={{
                  MenuProps: {
                    style: {
                      maxHeight: "30rem",
                    },
                  },
                }}
              >
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
                <MenuItem value="AR">Arkansas</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="CO">Colorado</MenuItem>
                <MenuItem value="CT">Connecticut</MenuItem>
                <MenuItem value="DE">Delaware</MenuItem>
                <MenuItem value="FL">Florida</MenuItem>
                <MenuItem value="GA">Georgia</MenuItem>
                <MenuItem value="HI">Hawaii</MenuItem>
                <MenuItem value="ID">Idaho</MenuItem>
                <MenuItem value="IL">Illinois</MenuItem>
                <MenuItem value="IN">Indiana</MenuItem>
                <MenuItem value="IA">Iowa</MenuItem>
                <MenuItem value="KS">Kansas</MenuItem>
                <MenuItem value="KY">Kentucky</MenuItem>
                <MenuItem value="LA">Louisiana</MenuItem>
                <MenuItem value="ME">Maine</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
                <MenuItem value="MA">Massachusetts</MenuItem>
                <MenuItem value="MI">Michigan</MenuItem>
                <MenuItem value="MN">Minnesota</MenuItem>
                <MenuItem value="MS">Mississippi</MenuItem>
                <MenuItem value="MO">Missouri</MenuItem>
                <MenuItem value="MT">Montana</MenuItem>
                <MenuItem value="NE">Nebraska</MenuItem>
                <MenuItem value="NV">Nevada</MenuItem>
                <MenuItem value="NH">New Hampshire</MenuItem>
                <MenuItem value="NJ">New Jersey</MenuItem>
                <MenuItem value="NM">New Mexico</MenuItem>
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="NC">North Carolina</MenuItem>
                <MenuItem value="ND">North Dakota</MenuItem>
                <MenuItem value="OH">Ohio</MenuItem>
                <MenuItem value="OK">Oklahoma</MenuItem>
                <MenuItem value="OR">Oregon</MenuItem>
                <MenuItem value="PA">Pennsylvania</MenuItem>
                <MenuItem value="RI">Rhode Island</MenuItem>
                <MenuItem value="SC">South Carolina</MenuItem>
                <MenuItem value="SD">South Dakota</MenuItem>
                <MenuItem value="TN">Tennessee</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
                <MenuItem value="UT">Utah</MenuItem>
                <MenuItem value="VT">Vermont</MenuItem>
                <MenuItem value="VA">Virginia</MenuItem>
                <MenuItem value="WA">Washington</MenuItem>
                <MenuItem value="WV">West Virginia</MenuItem>
                <MenuItem value="WI">Wisconsin</MenuItem>
                <MenuItem value="WY">Wyoming</MenuItem>
              </TextField>
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date of Birth"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 4" }}
              />
              <FlexBetween
                style={{
                  justifyContent: "flex-end",
                  gridColumn: "span 4",
                }}
              >
                <Button
                  className="form_submit-button"
                  type="submit"
                  sx={{
                    backgroundColor: theme.palette.secondary[500],
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
