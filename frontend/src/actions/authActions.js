import axios from 'axios';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_FAIL,
	REGISTER_SUCCESS
} from '../actions/types';
import { returnErrors } from './errorActions';

// we use dispatch because it is an async call
// Check token & load user
export const loadUser = () => (dispatch, getState) => {
	// USER LOADING
	dispatch({ type: USER_LOADING });

	axios
		.get('/api/auth/user', tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
			dispatch({
				type: AUTH_ERROR
			});
		});
};

// Register User
export const register = ({ name, email, password }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ name, email, password });
	axios
		.post('/api/users', body, config)
		.then((res) =>
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})
		)
		.catch((err) => {
			dispatch({
				type: REGISTER_FAIL
			});
		});
};

// Setup config/header and token
export const tokenConfig = (getState) => {
	// Get token from local storage
	const token = getState().auth.token;
	// Header
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	// If there is a token add it to headers
	if (token) {
		config.headers['x-auth-token'] = token;
	}
	return config;
};