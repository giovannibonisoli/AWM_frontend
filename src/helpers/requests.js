const BASE_URL = "http://localhost:8000/api"

export const get = async (url: string, token: string) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}

	if (token)
		headers.Authorization = `Bearer ${token}`;

	return fetch(`${BASE_URL}/${url}`, {
		method: 'GET',
		headers: headers
	})
	.then(res => res.json())
	.catch(err => console.error(err))
};

export const post = async (url: string, body: Object, token: string) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}

	if (token)
		headers.Authorization = `Bearer ${token}`;

	return fetch(`${BASE_URL}/${url}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.catch(err => console.error(err));
};

export const put = async (url: string, body: Object, token: string) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}

	if (token)
		headers.Authorization = `Bearer ${token}`;

	return fetch(`${BASE_URL}/${url}`, {
		method: 'PUT',
		headers: headers,
		body: JSON.stringify(body)
	})
	.then(res => res.json())
	.catch(err => console.error(err));
}

export const del = async (url: string, token: string) => {
	let headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	}

	if (token)
		headers.Authorization = `Bearer ${token}`;

	return fetch(`${BASE_URL}/${url}`, {
		method: 'DELETE',
		headers: headers
	})
	.then(res => {
		if (res.status === 204)
			return null;
		return res.json();
	})
	.catch(err => console.error(err));
}
