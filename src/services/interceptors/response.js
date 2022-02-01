import httpClient from '@/services/httpClient';
import { refreshTokenAPI } from '@/services/api/auth'
import httpStatusCode from '@/enums/httpStatusCode';

// Flags related to refreshToken
const refreshFlags = {
	isRefreshingToken: false,
	refreshTokenPromise: null,
};

// Logout
const logout = () => (window.location = '/logout');

// Refresh token
const refreshToken = async () => {
	// If there're any refresh calls ongoing, wait for it
	if (refreshFlags.isRefreshingToken) {
		return refreshFlags.refreshTokenPromise;
	}

	// Create refresh token fetch call
	refreshFlags.refreshTokenPromise = (async () => {
		const refreshTokenLocalStorage = localStorage.getItem('refreshToken');
		if (!refreshTokenLocalStorage) {
			throw new Error('missing refresh token');
		}

		// Refresh token
		const { data } = await refreshTokenAPI(refreshTokenLocalStorage);

		localStorage.setItem('refreshToken', data.refresh_token);
		localStorage.setItem('token', data.access_token);
	})();

	// Real refresh token process
	try {
		refreshFlags.isRefreshingToken = true;
		await refreshFlags.refreshTokenPromise;
	} catch (error) {
		logout();
	} finally {
		refreshFlags.isRefreshingToken = false;
	}

	return null;
};

export const interceptorResponse = (response) => {
	return response;
};

export const interceptorResponseError = async (error) => {
	const statusCode = error.response.status;
	const xReqRetry = error.config.headers['x-req-retry'];
	let errorMessage = null;

	switch (statusCode) {
		case httpStatusCode.BAD_REQUEST:
			errorMessage = {
				title: 'There was a problem with your request.',
				message: 'Please try again.',
			};
			break;

		case httpStatusCode.UNAUTHORIZED:
			if (xReqRetry >= 1 || refreshFlags.isRefreshingToken) {
				// If retry more than threshold, stop refreshToken and log user out
				// or if got 401 when refresh token, log user out
				// since this request is failed because of another reason
				logout();
			} else {
				// Try refreshing token
				await refreshToken();

				// Count how many times this request try to call the same fetch again
				error.config.headers['x-req-retry'] = xReqRetry ? xReqRetry + 1 : 1;

				// And call the same fetch again
				return httpClient.request(error.config);
			}

			break;

		case httpStatusCode.FORBIDDEN:
			window.location = '/forbidden';
			break;

		case httpStatusCode.NOT_FOUND:
			window.location = "/404";
			break;

		case httpStatusCode.INTERNAL_SERVER_ERROR:
			errorMessage = {
				title: 'There was an unexpected error.',
				message: 'Please try again.',
			};
			break;

		case httpStatusCode.BAD_GATEWAY:
			window.location = "/502";
			break;

		default:
			break;
	}

	if (errorMessage) {
		// TODO: Display error message
	}

	return Promise.reject(error);
};
