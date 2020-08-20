const BASE_URL = "http://localhost:8000/api"

export const request = async (url: string, method:string, body: Object) => {
	return fetch(`${BASE_URL}/${url}`, {
		method: method,
		body: JSON.stringify(body),
		headers: {
  		'Content-Type': 'application/json',
  		Accept: 'application/json'
  	}
	}).then(async res => {
    if (!res.ok) {
      throw new Error(`Error with status ${res.status}`);
    }
		return res.statusText === 'No Content' ? null : res.json();
	});
};
