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
  },
  
  checkUserOwnsBoard(id, token){
    
    if(token == null){
      return false;
    }
    else{
      // console.log(token, "checkUserOwnsBoard token")
      return api.checkUserOwnsBoard(id, token)
      .then((res) => {
        console.log(!!res.status, "the result")
        return !!res.status
      })
    }
  }
  
}
