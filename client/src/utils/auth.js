import { jwtDecode } from "jwt-decode";

export const saveTokenToLocal = (token) => {
	localStorage.setItem("token", token);
};

export const getTokenFromLocal = () => {
	return localStorage.getItem("token");
};

export const removeTokenFromLocal = () => {
	localStorage.removeItem("token");
};

export const isTokenValid = (token) => {
	if (!token) return false;

	const decodedToken = jwtDecode(token);
	const currentTime = Date.now() / 1000;

	if (decodedToken.exp < currentTime) return false;

	return true;
};

export const logout = () => {
	removeTokenFromLocal();
	window.location.reload();
};
