import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { saveTokenToLocal } from "../utils/auth";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await loginUser({ email, password });

			if (response && response.token) {
				saveTokenToLocal(response.token);
				navigate("/dashboard");
			}
		} catch (error) {
			setError(error.error);
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
				<h1 className="text-3xl font-semibold mb-4">Login</h1>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700">
							Email
						</label>
						<input
							className="mt-1 p-2 w-full border rounded-md"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="password" className="block text-gray-700">
							Password
						</label>
						<input
							className="mt-1 p-2 w-full border rounded-md"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
					>
						Login
					</button>
				</form>
				{error && (
					<div
						className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md"
						role="alert"
					>
						<strong>Error:</strong> {error}
					</div>
				)}
				<p className="mt-4 text-gray-700">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-500 hover:underline">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginPage;
