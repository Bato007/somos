/**
 * Autenticacion del usuario
 * Se obtiene la variable isAuth para saber si el usuario ya ingreso sesion
 * Al hacer logout, se remueve la variable
 * Al salirse de la pagina, se remueve la variable
 * **/
const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true
  },
  getLogInStatus() {
    return this.isLoggedIn
  }
}

export default authentication