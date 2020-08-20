import { request } from '../helpers/requests';

class AuthService {

  login = async (username, password) => {
    let res = await request("token/", 'POST', { username, password });
    if (res.access) {
      localStorage.setItem("user", JSON.stringify(res));
    }
    return res.data;
  }

  logout = () => {
    localStorage.removeItem("user");
  }

  isLoggedIn = () => {
    if(localStorage.getItem('user'))
      return true;
    return false;
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
