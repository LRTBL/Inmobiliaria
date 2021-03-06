import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./server";
import * as serviceWorker from "./serviceWorker";
import { initialState } from "./sesion/initialState";
import { StateProvider } from "./sesion/store";
import { mainReducer } from "./sesion/reducers";

const firebase = new Firebase();

ReactDOM.render(
  <FirebaseContext.Provider value={firebase}>
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
