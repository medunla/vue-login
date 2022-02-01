export const interceptorRequest = (request) => {
	const token = localStorage.getItem('token');
	if (token) {
		request.headers.Authorization = `Bearer ${token}`;
	}
	return request;
};

export const interceptorRequestError = (error) => {
	return Promise.reject(error);
};
