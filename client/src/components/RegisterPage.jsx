import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";
import { saveTokenToLocal } from "../utils/auth";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await registerUser({ name, email, password });
			saveTokenToLocal(response.token);
			navigate("/dashboard");
		} catch (error) {
			setError(error.error);
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
				<h1 className="text-3xl font-semibold mb-4">Register</h1>
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label htmlFor="name" className="block text-gray-700">
							Name
						</label>
						<input
							className="mt-1 p-2 w-full border rounded-md"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
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
						Register
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
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
