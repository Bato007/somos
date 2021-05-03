const authentication = {
  isLoggedIn: false,
  onAuthentication() {
    this.isLoggedIn = true
  },
  getLogInStatus() {
    return localStorage.getItem('isAuth')
  }
}

export default authentication