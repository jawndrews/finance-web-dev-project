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
  Alert,
  AlertTitle,
  Checkbox,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useAuth from "hooks/useAuth";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { states } from "config/states.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { useAddUserMutation } from "state/api";

const AddMembers = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState("");

  const [addUser, { isLoading }] = useAddUserMutation();
  const admin = useAuth();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = "Add Members | Everdant";
  }, []);

  const handleBackButton = () => {
    navigate("/members");
  };
  const handleImportButton = () => {
    navigate("/members/create/import");
  };

  function formatDate(date) {
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const currentDate = new Date();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "temp",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    dob: "null",
    organization: admin.organization,
    active: true,
    memberStatus: "active",
    memberStartDate: formatDate(currentDate),
    memberEndDate: "null",
    userType: "user",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setValues({
      ...values,
      dob: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await addUser(values);
    } catch (err) {
      if (!err.status) {
        <Alert severity="error" sx={{ mb: "2rem" }}>
          <AlertTitle>Could not create user</AlertTitle> An unexpected error
          occurred on the server. Please try again later or contact support.
        </Alert>;
      } else if (err.status === 400) {
        setErrMsg(
          <Alert severity="warning" sx={{ mb: "2rem" }}>
            <AlertTitle>Missing fields</AlertTitle>
            It seems you forgot to provide some information. Please fill in the
            required fields and try again.
          </Alert>
        );
      } else if (err.status === 401) {
        setErrMsg(
          <Alert severity="error" sx={{ mb: "2rem" }}>
            <AlertTitle>Authentication failed</AlertTitle>
            There was an error authenticating your credentials. Please try again
            later or contact support.
          </Alert>
        );
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen";

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
      <p ref={errRef} className={errClass} aria-live="assertive">
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <Box
          display="grid"
          gap="2rem"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            " & > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Typography marginTop="3rem" sx={{ gridColumn: "span 4" }}>
            Contact Info
          </Typography>
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name*"
            onChange={handleChange}
            inputRef={userRef}
            value={values.firstName}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name*"
            onChange={handleChange}
            inputRef={userRef}
            value={values.lastName}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Email*"
            onChange={handleChange}
            inputRef={userRef}
            value={values.email}
            name="email"
            sx={{ gridColumn: "span 4" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Phone Number"
            onChange={handleChange}
            inputRef={userRef}
            value={values.phoneNumber}
            name="phoneNumber"
            sx={{ gridColumn: "span 4" }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              value={values.dob}
              variant="filled"
              label="Date of Birth"
              onChange={handleDateChange}
              inputRef={userRef}
              name="dob"
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
              onChange={handleChange}
              inputRef={userRef}
              name="userType"
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
            onChange={handleChange}
            inputRef={userRef}
            value={values.street}
            name="street"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="City"
            onChange={handleChange}
            inputRef={userRef}
            value={values.city}
            name="city"
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
                inputRef={userRef}
              />
            )}
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Zip"
            onChange={handleChange}
            inputRef={userRef}
            value={values.zip}
            name="zip"
            sx={{ gridColumn: "span 2" }}
          />
          <Box>
            <Checkbox
              type="checkbox"
              label="Send registration email?"
              sx={{
                "&.Mui-checked": { color: theme.palette.secondary[400] },
              }}
              defaultChecked
            />
            Send registration email?
          </Box>
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
    </Box>
  );
};

export default AddMembers;
