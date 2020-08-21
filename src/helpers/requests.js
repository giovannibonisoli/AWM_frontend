import AuthService from '../services/auth.service';

const BASE_URL = "http://localhost:8000/api"

export const request = async (url: string, method:string, body: Object) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}

	if (AuthService.isLoggedIn()){
		AuthService.checkToken();
		headers.Authorization = `Bearer ${AuthService.getCurrentUser().token.access}`;
	}

	return fetch(`${BASE_URL}/${url}`, {
		method: method,
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(async res => {
    if (!res.ok) {
				throw new Error(`Error with status ${res.status}`);
			}
		return res.statusText === 'No Content' ? null : res.json();
	});
};
