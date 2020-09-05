import { post } from '../helpers/requests';

class AuthService {

  login = async (username, password) => {
    return post("token/", {
      username: username,
      password: password
    }).then(userInfo => {

      if (userInfo.detail === "No active account found with the given credentials"){
        return false;
      }

      localStorage.setItem('user', JSON.stringify({
          username: username,
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          email: userInfo.email
        }));

      localStorage.setItem('token', JSON.stringify({
          access: userInfo.access,
          refresh: userInfo.refresh,
          date: new Date()
        }));
        return "login successful";
    });
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  isLoggedIn = () => {
    if(localStorage.getItem('user'))
      return true;
    return false;
  }

  checkToken = async () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const startDate = Date.parse(token.date);
    const endDate = new Date();
    if ((endDate - startDate) / 1000 >=  290){
      return post("token/refresh/", {refresh: token.refresh})
      .then(newToken => {
        token.access = newToken.access;
        localStorage.setItem('token', JSON.stringify(token));
      })
    }
  }

  getToken = async () => {
    await this.checkToken();
    const token = JSON.parse(localStorage.getItem('token'));
    return token.access;
  }
}

export default new AuthService();
