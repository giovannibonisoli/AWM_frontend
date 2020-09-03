class AuthService {

  login = async (username, password) => {
    return fetch("http://localhost:8000/api/token/", {
       method: 'POST',
       headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
       body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(data => {
      if(data.access && data.refresh){
        this.storeUser(username, data.access, data.refresh);
        return "login successful";
      }
      return data.detail;
    })
    .catch(err => console.error(err));
  }

  storeUser = async (username, access, refresh) => {
    localStorage.setItem('user', JSON.stringify({
        name: username,
        token: {
                  access: access,
                  refresh: refresh
                },
        date: new Date()
      }));
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

  checkToken = async () => {
    const user = this.getCurrentUser();

    const startDate = Date.parse(user.date);
    const endDate = new Date();
    if ((endDate - startDate) / 1000 >=  290){
      return fetch("http://localhost:8000/api/token/refresh/", {
    	   method: 'POST',
      	 headers: {
        		        'Content-Type': 'application/json',
      		          Accept: 'application/json',
      	          },
    		 body: JSON.stringify({refresh: user.token.refresh})
    	})
    	.then(res => {
        if (!res.ok) {
    		    throw new Error(`Error with status ${res.status}`);
    		}
    		return res.json();
    	})
      .then(res => {
        this.storeUser(user.name, res.access, user.token.refresh);
      });

    }
  }

  getToken = async () => {
    await this.checkToken();
    const user = this.getCurrentUser();
    return user.token.access;
  }
}

export default new AuthService();
