import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTokenFromLocal, isTokenValid, logout } from "../utils/auth";

const NavLink = ({ title, to }) => {
	return (
		<Link to={to} className="text-gray-800 hover:text-gray-900">
			{title}
		</Link>
	);
};

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(isTokenValid(getTokenFromLocal()));
	const location = useLocation();

	useEffect(() => {
		setIsLoggedIn(isTokenValid(getTokenFromLocal()));
	}, [location.pathname]);

	const handleLogout = () => {
		logout();
		setIsLoggedIn(false);
	};

	return (
		<nav className="bg-white shadow-md fixed w-full">
			<div className="container mx-auto px-4">
				<div className="flex justify-end items-center h-16">
					<div className="ml-4 flex items-center space-x-4">
						<NavLink title="Home" to="/" />
						{isLoggedIn ? (
							<>
								<NavLink title="Dashboard" to="/dashboard" />
								<button
									onClick={handleLogout}
									className="text-gray-800 hover:text-gray-900"
								>
									Logout
								</button>
							</>
						) : (
							<>
								<NavLink title="Login" to="/login" />
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
