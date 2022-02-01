import { postLoginAPI } from '@/services/api/auth';
import httpStatusCode from '@/enums/httpStatusCode';
import errorMessage from '@/enums/errorMessage';

// Mutations name
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERROR = 'CLEAR_ERROR';

const defaultUser = {};
const tokenAtInit = localStorage.getItem('token');
const mappingLoginErrorMessages = {
	[httpStatusCode.BAD_REQUEST]: errorMessage.login.LOGIN_FAILURE,
	[httpStatusCode.FORBIDDEN]: errorMessage.login.LOGIN_ACCOUNT_INACTIVE,
	[httpStatusCode.TOO_MANY_REQUESTS]: errorMessage.login.LOGIN_TOO_MANY,
};

const state = () => ({
	isLoading: false,
	isLoggedIn: !!tokenAtInit,
	isError: false,
	errorMessage: null,
	user: defaultUser,
});

const getters = {};


const mutations = {
	[LOGIN_REQUEST](state) {
		state.isLoading = true;
		state.isLoggedIn = false;
		state.isError = false;
		state.errorMessage = null;
	},

	[LOGIN_SUCCESS](state) {
		state.isLoading = false;
		state.isLoggedIn = true;
	},

	[LOGIN_FAILURE](state, message) {
		state.isLoading = false;
		state.isLoggedIn = false;
		state.isError = true;
		state.errorMessage = message;
	},

	[LOGOUT](state) {
		state.isLoggedIn = false;
		state.user = defaultUser;
	},

	[CLEAR_ERROR](state) {
		state.isError = false;
		state.errorMessage = null;
	},
};

const actions = {
	async postLogin({ commit }, payload) {
		try {
			commit(LOGIN_REQUEST);

			const username = payload?.username ?? null;
			const password = payload?.password ?? null;

			const response = await postLoginAPI({
				username,
				password,
			});

			const accessToken = response?.data?.data?.access_token ?? null;
			const refreshToken = response?.data?.data?.refresh_token ?? null;

			// Keep token, refreshToken to local storeage
			if (accessToken) {
				localStorage.setItem('token', accessToken);
			}

			if (refreshToken) {
				localStorage.setItem('refreshToken', refreshToken);
			}

			commit(LOGIN_SUCCESS);
		} catch (error) {
			const errorStatusCode = error?.response?.status ?? null;
			const message = mappingLoginErrorMessages[errorStatusCode] ?? errorMessage.login.UNEXPECTED_ERROR;

			commit(LOGIN_FAILURE, message);
		}
	},

	logout({ commit }) {
		commit(LOGOUT);
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
	},

	clearError({ commit }) {
		commit(LOGIN_CLEAR_ERROR);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};