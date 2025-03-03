import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getProfile() {
    return axios.get(API_URL + 'profile', { headers: authHeader() });
  }
  getPatients() {
  return axios.get(`http://localhost:3000/api/patient/get`, { headers: authHeader() });
  }

  deletePatient (_id) {
    
      return axios.delete(`http://localhost:3000/api/patient/delete/${_id}`,{ headers: authHeader() });
    
  }

}

export default new UserService();