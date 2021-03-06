import superagent from 'superagent'
import { API_HOST } from './config'

class Api {
  
  requestLogin = (email, password) => (
    superagent
    .post(`${API_HOST}/auth/sessions`)
    .send({ email, password })
  )
  
  requestLogout = (token) => (
    superagent
    .delete(`${API_HOST}/auth/sessions`)
    .set('Authorization', `token ${token}`)
  )
  
  getBoardsList = (page, count) => {
    return superagent
    .get(`${API_HOST}/boards`)
    .query({page, count})
  }
  
  
  getBoard = (id) => (
    superagent
    .get(`${API_HOST}/boards/${id}`)
  )
  
  getBookmarks = (boardId) => (
    superagent
    .get(`${API_HOST}/boards/${boardId}/bookmarks`)
  )
  
  signUp = (email, password) => (
    superagent
    .post(`${API_HOST}/users`)
    .send(email, password)
  )
  
}

export default new Api();
