const BASE_URL = "http://localhost:8000/api"

export const get = async (url: string) => {
	let headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		}

	return fetch(`${BASE_URL}/${url}`, {
		method: 'GET',
		headers: headers
	})
  .then(res => {
    if (!res.ok){
      throw new Error(`Error with status ${res.status}`);
    }
    return res.json();
  })
};
