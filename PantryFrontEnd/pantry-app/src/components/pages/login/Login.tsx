import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { DOMAIN, MyLocationDesc } from "../../../App";

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

  const history = useHistory();
  const location = useLocation() as MyLocationDesc;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRoute = () => {
    history.push("/signup");
  };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    if (!email || !password) return;

    const loginParams: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };

    const resp = await fetch(DOMAIN + "/api/Users/Login", loginParams);

    console.log(resp);
    if (resp.ok || resp.status === 401) {
      if (!document.cookie.includes("LoggedIn"))
        document.cookie = "LoggedIn=True; path=/;" + document.cookie;

      console.log(document.cookie);
      if (location) {
        const setLoggedIn = location.setLoggedIn;
        setLoggedIn(true);
      }
    } else console.error(resp);
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
          {" "}
          Login{" "}
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
      </Paper>
    </Grid>
  );
};

export default Login;
