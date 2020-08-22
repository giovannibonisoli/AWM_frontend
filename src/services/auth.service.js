import { request } from '../helpers/requests';

class AuthService {

  login = async (username, password) => {
    let res = await request("token/", 'POST', { username, password });
    if (res.access) {
      localStorage.setItem("user", JSON.stringify({
                                          name: username ,
                                          token: res,
                                          date: new Date()
                                        })
                          );
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
    return JSON.parse(localStorage.getItem('user'));
  }

  checkToken = () => {
    const token = this.getCurrentUser().token;

    const startDate = Date.parse(this.getCurrentUser().date);
    const endDate = new Date();
    if ((endDate - startDate) / 1000 >=  290){
      return fetch("http://localhost:8000/api/token/refresh/", {
    	   method: 'POST',
      	 headers: {
        		        'Content-Type': 'application/json',
      		          Accept: 'application/json',
      	          },
    		 body: JSON.stringify({refresh: token.refresh})
    	})
    	.then(res => {
        if (!res.ok) {
    		    throw new Error(`Error with status ${res.status}`);
    		}
    		return res.json();
    	})
      .then(res => {
        localStorage.setItem("user", JSON.stringify({
                                            name: this.getCurrentUser().name ,
                                            token: {
                                                access: res.access,
                                                refresh: token.refresh
                                              },
                                            date: new Date()
                                          })
                            );
      });

    }
  }
}

export default new AuthService();
