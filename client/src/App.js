import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useProtectedRoute } from "./hooks/useProtectedRoute";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardPage from "./components/DashboardPage";
import Navbar from "./components/Navbar";

const DashboardWrapper = () => {
	const isAuthenticated = useProtectedRoute("/login");
	return isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />;
}

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/dashboard" element={<DashboardWrapper />} />
			</Routes>
		</Router>
	);
}

export default App;
