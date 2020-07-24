import React, { useState, useEffect } from "react";
import {
  Container,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import LaockOutLineIcon from "@material-ui/icons/LockOutlined";
import { compose } from "recompose";
import { consumerFirebase } from "../../server";

const style = {
  paper: {
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 8,
    backgroundColor: "#e53935",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  submit: {
    marginTop: 15,
    marginBotton: 20,
  },
};

const RegistrarUsuario = (props) => {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [fire, setFire] = useState(null);

  useEffect(() => {
    console.log(props);
    if (fire === null) {
      setFire(props.firebase);
    }
  }, [props.firebase]);

  const registerUser = (e) => {
    e.preventDefault();
    fire.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const userdb = {
          userId: res.user.uid,
          email: user.email,
          nombre: user.nombre,
          apellido: user.apellido,
        };
        fire.db
          .collection("Users")
          .add(userdb)
          .then((res) => {
            console.log("Fue un exito", res);
            props.history.push("/");
          })
          .catch((err) => {
            console.log("Error");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container maxWidth="md">
      <div style={style.paper}>
        <Avatar style={style.avatar}>
          <LaockOutLineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registre su Cuenta
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                name="nombre"
                fullWidth
                label="Ingrese su nombre"
                value={user.nombre}
                onChange={(e) => {
                  setUser({ ...user, nombre: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="apellido"
                fullWidth
                label="Ingrese sus apellidos"
                value={user.apellido}
                onChange={(e) => {
                  setUser({ ...user, apellido: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="email"
                fullWidth
                label="Ingrese su e-mail"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="password"
                name="password"
                fullWidth
                label="Ingrese su password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={registerUser}
                size="large"
                color="primary"
                style={style.submit}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default compose(consumerFirebase)(RegistrarUsuario);
