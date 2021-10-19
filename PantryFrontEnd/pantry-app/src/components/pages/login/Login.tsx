import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import React from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { DOMAIN, MyLocationDesc } from "../../../App";
import SignUp from "../signup/Signup";

interface loginProps {
  message?: string;
}

enum LOGIN_FIELDS {
  EMAIL = "email",
  PASSWORD = "password",
}

const Login: React.FC<loginProps> = ({ message }) => {
  const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 500,
    margin: "20px auto",
  };

  const theme = useTheme();

  const history = useHistory();
  const location = useLocation() as MyLocationDesc;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const [toSignUp, setToSignUp] = React.useState(false);

  const handleRoute = () => {
    // history.push("/signup");
    setToSignUp(true);
    // setToSignUp(false);
    // history.listen((location, action) => {
    //   if (action === "POP") {
    //     setToSignUp(false);
    //     // console.log("hi");
    //   }
    // });
  };

  const openSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (!email || !password) return;

    setIsLoggingIn(true);
    const loginParams: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };

    const resp = await fetch(DOMAIN + "/api/Users/Login", loginParams).catch(
      (e) => console.error(e)
    );

    if (!resp) {
      setIsLoggingIn(false);
      openSnackbar("Could not log in");
      return;
    }

    console.log(resp);
    if (resp.ok || resp.status === 401) {
      if (!document.cookie.includes("LoggedIn"))
        document.cookie = "LoggedIn=True; path=/;" + document.cookie;

      console.log(document.cookie);
      if (location && location.setLoggedIn) {
        const setLoggedIn = location.setLoggedIn;
        setLoggedIn(true);
      } else {
        document.location.reload();
      }
    } else {
      console.error(resp);
      openSnackbar("Could not log in");
    }
    setIsLoggingIn(false);
  };

  const handleChange = (
    field: LOGIN_FIELDS,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (field) {
      case LOGIN_FIELDS.EMAIL:
      default:
        setEmail(e.target.value);
        break;
      case LOGIN_FIELDS.PASSWORD:
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <Grid>
      <Paper elevation={30} variant="outlined" style={paperStyle}>
        {/* {message && <Snackbar open={true} autoHideDuration={6000} color="primary"><>message</></Snackbar> } */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2500}
          onClose={handleSnackbarClose}
        >
          <div
            style={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.background.default,
              padding: theme.spacing(4),
              borderRadius: theme.spacing(4),
            }}
          >
            {snackbarMessage}
          </div>
        </Snackbar>
        <Grid>
          <Avatar alt="Remy Sharp" src="/static/images/avatars/unnamed.png" />
          <h2> Login </h2>
        </Grid>
        <Box mt={5}>
          <div>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
              value={email}
              onChange={(e) => handleChange(LOGIN_FIELDS.EMAIL, e)}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => handleChange(LOGIN_FIELDS.PASSWORD, e)}
              required
              variant="outlined"
            />
          </div>
        </Box>
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleLogin}
        >
          {isLoggingIn ? (
            <CircularProgress color="secondary" variant="indeterminate" />
          ) : (
            "Login"
          )}
        </Button>
        <Typography>
          {" "}
          Don't have an account?
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography>
          {" "}
          Don't have an account?
          <Link component="button" variant="body1" onClick={handleRoute}>
            Sign Up
          </Link>
        </Typography>
        <Switch>
          {toSignUp && (
            <Redirect to="/signup">
              <SignUp />
            </Redirect>
          )}
        </Switch>
      </Paper>
    </Grid>
  );
};

export default Login;
