import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Checkbox,
  useTheme,
  useMediaQuery,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "state/auth/authSlice";
import { useLoginMutation } from "state/auth/authApiSlice";
import { usePersist } from "hooks/usePersist";
import loginBackgroundImage from "assets/login-background.png";
import logoColorForDark from "assets/svg/logotype-white.svg";
import logoColorForLight from "assets/svg/logotype-black.svg";

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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    document.title = "Login | Everdant";
  }, []);

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
        <Alert severity="error" sx={{ mb: "2rem" }}>
          <AlertTitle>No server response</AlertTitle> An unexpected error
          occurred on the server. Please try again later or contact support.
        </Alert>;
      } else if (err.status === 400) {
        setErrMsg(
          <Alert severity="warning" sx={{ mb: "2rem" }}>
            <AlertTitle>Missing email or password</AlertTitle>
            It seems you forgot to provide your email or password. Please fill
            in both fields to proceed.
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
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev); // could be causing a bug where user can go back and be authenticated again

  const errClass = errMsg ? "errmsg" : "offscreen";

  let logo = "";

  if (theme.palette.mode === "light") {
    logo = logoColorForLight;
  } else if (theme.palette.mode === "dark") {
    logo = logoColorForDark;
  }

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

  const content = (
    <Box
      class="loginImage"
      style={
        {
          //backgroundImage: `url(${loginBackgroundImage})`,
          //backgroundSize: "cover",
          //height: "100vh",
        }
      }
    >
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Box display="block" alignItems="center" width="100%">
          <Box
            component="img"
            alt="logo"
            src={logo}
            width="250px"
            sx={{ objectFit: "contain" }}
          />
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="10rem auto"
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
                inputRef={userRef}
                onChange={handleUserInput}
                autoComplete="off"
                sx={{ gridColumn: "span 4" }}
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
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? palette.secondary[500]
                      : palette.secondary[400],
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
                      color:
                        theme.palette.mode === "dark"
                          ? palette.secondary[500]
                          : palette.secondary[400],
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
  return content;
};

export default Login;
