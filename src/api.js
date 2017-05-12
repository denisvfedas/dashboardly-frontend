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
    .set('Authorization', `Bearer ${token}`)
    .send({token})
  )
  
  getBoardsList = (page, count) => {
    return superagent
    .get(`${API_HOST}/boards`)
    .query({page, count});
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
    .post(`${API_HOST}/auth/users`)
    .send({email, password})
  )
  
  getMe = (token) => (
    superagent
    .get(`${API_HOST}/auth/me`)
    .set('Authorization', `Bearer ${token}`)
  )
  
  createBoard = (title, description, token) => (
    superagent
    .post(`${API_HOST}/boards`)
    .set('Authorization', `Bearer ${token}`)
    .send({title, description})
    
  )
  
}

export default new Api();
