import { request } from '../helpers/requests';

class AuthService {
  async login(username, password) {
    let res = await request("token/", 'POST', { username, password });
    console.log(res);
    if (res.access) {
      localStorage.setItem("user", res);
    }
    return res.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
