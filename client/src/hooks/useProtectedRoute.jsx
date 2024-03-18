import { useNavigate } from "react-router-dom";
import { getTokenFromLocal, isTokenValid } from "../utils/auth";

export const useProtectedRoute = (redirectPath = "/login") => {
	const navigate = useNavigate();
	const token = getTokenFromLocal();

	if (!isTokenValid(token)) {
		navigate(redirectPath);
		return null;
	}

	return true;
};
