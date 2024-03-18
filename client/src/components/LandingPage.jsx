import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
				<h1 className="text-3xl font-semibold mb-4">Login App</h1>
				<p className="text-gray-700 mb-6">
					A simple login app using React for frontend and Node.js and PostgreSQL for
					backend.
				</p>
				<Link to="/login" className="text-blue-500 hover:underline">
					Login
				</Link>
				<span className="mx-2">or</span>
				<Link to="/register" className="text-blue-500 hover:underline">
					Register
				</Link>
			</div>
		</div>
	);
};

export default LandingPage;
