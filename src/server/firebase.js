import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD9xlbEeUIt79-1znTAHoM6CeAm8huJTnA",
  authDomain: "pruebreact.firebaseapp.com",
  databaseURL: "https://pruebreact.firebaseio.com",
  projectId: "pruebreact",
  storageBucket: "pruebreact.appspot.com",
  messagingSenderId: "64642051520",
  appId: "1:64642051520:web:6983021a66ecd3edd42c25",
};

function Firebase() {
  app.initializeApp(config);
  this.db = app.firestore();
  this.auth = app.auth();
  this.estaIniciado = () => {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  };
}

export default Firebase;
