const BASE_URL = "http://localhost:8000/api"

export const get = async (url: string) => {
	return fetch(`${BASE_URL}/${url}`, {
	    method: 'GET',
	    headers: {
        'Content-Type': 'application/json',
    	   Accept: 'application/json',
    	}
  })
  .then(res => {
    if (!res.ok){
      throw new Error(`Error with status ${res.status}`);
    }
    return res.json();
  })
};


export const post = async (url: string, body: Object) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }).then(res => {
    if (!res.ok) {
      throw new Error(`Error with status ${res.status}`);
    }
    return res.json();
  });
};
