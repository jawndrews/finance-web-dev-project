import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Checkbox,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/auth/authSlice";
import { useLoginMutation } from "state/auth/authApiSlice";
import { usePersist } from "hooks/usePersist";

const Login = () => {
  const theme = useTheme();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    //userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      navigate("/dashboard");
      window.location.reload(); // BANDAID FIX FOR LOGIN BUG 4-27:1 -- NOT OPTIMAL!!!
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading)
    return (
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

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="secondary">
          Fisca
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Login
        </Typography>
        <main className="login">
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <form className="form" onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                className="form_input"
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={handleUserInput}
                autoComplete="off"
                sx={{ ref: { userRef }, gridColumn: "span 4" }}
              />
              <TextField
                className="form_input"
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={handlePwdInput}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            {/* BUTTON */}
            <Box>
              <Button
                className="form_submit-button"
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.secondary[500],
                  color: palette.background.alt,
                  "&:hover": { color: palette.secondary[500] },
                }}
              >
                {"LOGIN"}
              </Button>
              <Box>
                <Checkbox
                  type="checkbox"
                  id="persist"
                  onChange={handleToggle}
                  checked={persist}
                  sx={{
                    "&.Mui-checked": {
                      color: palette.secondary[500],
                    },
                  }}
                />
                Trust this device?
              </Box>
            </Box>
          </form>
        </main>
      </Box>
    </Box>
  );
};

export default Login;
