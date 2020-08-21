import { request } from '../helpers/requests';

class AuthService {

  login = async (username, password) => {
    let res = await request("token/", 'POST', { username, password });
    if (res.access) {
      localStorage.setItem("user", JSON.stringify({ name: username , token: res}) );
    }

    return res;
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
    const user = JSON.parse(localStorage.getItem('user'));
    return user.name;
  }
}

export default new AuthService();
