export const interceptorResponse = (response) => {
	return response;
};

export const interceptorResponseError = async (error) => {
	return Promise.reject(error);
};
