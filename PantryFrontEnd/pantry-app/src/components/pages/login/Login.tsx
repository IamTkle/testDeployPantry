import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import React from "react";
import { Redirect, Switch } from "react-router";
import { DOMAIN } from "../../../App";
import SignUp from "../signup/Signup";

interface loginProps {
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}

enum LOGIN_FIELDS {
  EMAIL = "email",
  PASSWORD = "password",
}

const Login: React.FC<loginProps> = ({ setLoggedIn }) => {
  const theme = useTheme();

  const paperStyle = {
    padding: 20,
    height: "80vh",
    margin: "20px auto",
    backgroundColor: theme.palette.background.default,
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const [toSignUp, setToSignUp] = React.useState(false);

  const handleRoute = () => {
    setToSignUp(true);
  };

  const { enqueueSnackbar } = useSnackbar();

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
      enqueueSnackbar("Could not log in!", { variant: "error" });
      return;
    }

    console.log(resp);
    if (resp.ok || resp.status === 401) {
      // if (location && location.setLoggedIn) {
      //   const setLoggedIn = location.setLoggedIn;
      //   setLoggedIn(true);
      // } else {
      //   document.location.reload();
      // }
      if (setLoggedIn) {
        setLoggedIn(true);
      }
    } else {
      console.error(resp);
      enqueueSnackbar("Could not log in!", { variant: "error" });
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
      <Container style={paperStyle} maxWidth="sm">
        {/* {message && <Snackbar open={true} autoHideDuration={6000} color="primary"><>message</></Snackbar> } */}
        <Grid item xs={12} style={{ textAlign: "center" }}>
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
          <br />
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
        <br />
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
          style={{
            height: theme.spacing(5),
            marginBottom: theme.spacing(5),
            color: theme.palette.primary.light,
          }}
        >
          {isLoggingIn ? (
            <CircularProgress
              style={{ color: theme.palette.primary.light }}
              variant="indeterminate"
              size={theme.spacing(4)}
            />
          ) : (
            "Login"
          )}
        </Button>
        <br />
        <Typography variant="body2">
          {"Forgot password? "}
          <Link href="#">Reset Password</Link>
        </Typography>
        <br />

        <Typography>
          {"Don't have an account? "}
          <Link component="button" variant="body2" onClick={handleRoute}>
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
      </Container>
    </Grid>
  );
};

export default Login;
