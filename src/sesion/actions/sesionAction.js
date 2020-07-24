export const iniciarSesion = (dispatch, firebase, email, password) => {
  return new Promise((resolve, eject) => {
    firebase.auth
      .signInWithEmailandPassword(email, password)
      .then((res) => {
        firebase.db
          .collection("Users")
          .doc(res.user.uid)
          .get()
          .then((doc) => {
            const usuarioDB = doc.data();
            dispatch({
              type: "INICIAR_SESION",
              sesion: usuarioDB,
              autenticado: true,
            });
            resolve();
          });
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
};
export const crearUsuario = (dispatch, firebase, usuario) => {
  return new Promise((resolve, reject) => {
    firebase.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((res) => {
        firebase.db
          .collection("Users")
          .doc(res.user.uid)
          .set(
            {
              id: res.user.uid,
              email: usuario.email,
              nombre: usuario.nombre,
              apellido: usuario.apellido,
            },
            { merge: true }
          )
          .then((doc) => {
            usuario.id = res.user.uid;
            dispatch({
              type: "INICIAR_SESION",
              sesion: usuario,
              autenticado: true,
            });
            resolve();
          });
      })
      .cath((err) => {
        console.log(err);
      });
  });
};

export const salirSesion = (dispatch, firebase) => {
  return new Promise((resolve, eject) => {
    firebase.auth.signOut().then((salir) => {
      dispatch({
        type: "SALIR_SESION",
        nuevoUsuario: {
          nombre: "",
          apellido: "",
          email: "",
          foto: "",
          id: "",
          telefono: "",
        },
        autenticado: false,
      });
      resolve();
    });
  });
};
