import { useEffect, useState } from "react";
import { getUserDetails } from "../utils/api";

const DashboardPage = () => {
	const [user, setUser] = useState([]);

	const handleUserDetails = async (e) => {
		try {
			const response = await getUserDetails();
			if (response.data) {
				setUser(response.data);
			}
		} catch (error) {
			console.error(error.error);
		}
	};

	useEffect(() => {
		handleUserDetails();
	}, []);

	return (
		<div className="min-h-screen flex justify-center items-center">
			<div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
				<h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
				<p className="text-gray-700 mb-6">
					Welcome to your dashboard{user && user.name && `, ${user.name}`}!
				</p>
			</div>
		</div>
	);
};

export default DashboardPage;
