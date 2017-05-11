import api from './api';

module.exports = {
  login(email, pass) {
    if (localStorage.token) {
      throw new Error('Already logged in')
    }
    else {
      return api.requestLogin(email, pass)
      .then(res => localStorage.token = res.body.token)
    }
  },

  getToken() {
    return localStorage.token
  },

  logout() {
    return api.requestLogout(localStorage.token)
    .then(res => delete localStorage.token )
  },

  isLoggedIn() {
    return !!localStorage.token
  },
  
  signup(email, password) {
    //console.log(email, password, "the email and password");
    return api.signUp(email, password)
  },
  
  getMe(token) {
    return api.getMe(token);
  }
  
}
