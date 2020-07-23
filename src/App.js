import React from "react";
import AppNavbar from "./components/layout/AppNavbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

import theme from "./theme/theme";
import { Grid } from "@material-ui/core";

import ListInmuebles from "./components/views/ListaInmuebles";
import RegistrarUsuario from "./components/security/RegistrarUsuario";

function App() {
  return (
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
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
