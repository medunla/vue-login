import httpClient from '@/services/httpClient';

export const AUTH_END_POINT = '/oauth/token';

export const postLoginAPI = ({ username, password }) => httpClient.post(AUTH_END_POINT, {
	username,
	password,
	scope: '*',
	grant_type: 'password',
	client_id: process.env.VUE_APP_CLIENT_ID,
	client_secret: process.env.VUE_APP_CLIENT_SECRET,
});

export const refreshTokenAPI = (refreshToken) => httpClient.post(AUTH_END_POINT, {
	grant_type: 'refresh_token',
	refresh_token: refreshToken,
	client_id: process.env.VUE_APP_CLIENT_ID,
	client_secret: process.env.VUE_APP_CLIENT_SECRET,
});
