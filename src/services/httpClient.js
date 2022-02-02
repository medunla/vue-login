import axios from 'axios';
import { interceptorRequest, interceptorRequestError } from '@/services/interceptors/request';
import { interceptorResponse, interceptorResponseError } from '@/services/interceptors/response';

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_APP_API_URL,
	timeout: 180000, // 3 mins
	headers: {
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
	withCredentials: true,
});

httpClient.interceptors.request.use(interceptorRequest, interceptorRequestError);
httpClient.interceptors.response.use(interceptorResponse, interceptorResponseError);

export default httpClient;
