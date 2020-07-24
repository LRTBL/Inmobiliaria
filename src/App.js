import React, { useContext, useState, useEffect } from "react";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/theme";
import { Grid } from "@material-ui/core";

import ListInmuebles from "./components/views/ListaInmuebles";
import RegistrarUsuario from "./components/security/RegistrarUsuario";
import Login from "./components/security/Login";

import { FirebaseContext } from "./server";

function App() {
  let firebase = useContext(FirebaseContext);
  const [autenticacionInit, setAutenticacionInit] = useState(false);

  useEffect(() => {
    firebase.estaIniciado().then((res) => {
      setAutenticacionInit(res);
    });
  });

  return autenticacionInit !== false ? (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavbar />
        <Grid>
          <Switch>
            <Route path="/" exact component={ListInmuebles}></Route>
            <Route
              path="/auth/registrarUsuario"
              exact
              component={RegistrarUsuario}
            ></Route>
            <Route path="/auth/login" exact component={Login}></Route>
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  ) : null;
}

export default App;
