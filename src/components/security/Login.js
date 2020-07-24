import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 5,
    backgroundColor: "red",
  },
  form: {
    width: "100%",
    margingTop: 8,
  },
};

const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [fire, setFire] = useState(null);
  useEffect(() => {
    if (fire === null) {
      setFire(props.firebase);
    }
  }, [props.firebase]);

  const log = (e) => {
    e.preventDefault();
    fire.auth
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container maxWidth="xs">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LockOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingrese Usuario
        </Typography>
        <form style={style.form}>
          <TextField
            variant="outlined"
            label="E-mail"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            name="email"
            fullWidth
            margin="normal"
          />
          <TextField
            variant="outlined"
            label="Password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            type="password"
            name="password"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={log}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default compose(consumerFirebase)(Login);
