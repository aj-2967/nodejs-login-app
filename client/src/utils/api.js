import axios from "axios";
import { getTokenFromLocal } from "./auth";

// Api config
const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use(
	(config) => {
		const token = getTokenFromLocal();
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Endpoints
export const loginUser = async (userData) => {
	try {
		const response = await api.post("/user/login", userData);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const registerUser = async (userData) => {
	try {
		const response = await api.post("/user/register", userData);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export const getUserDetails = async () => {
	try {
		const response = await api.get("/user");
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};

export default api;
