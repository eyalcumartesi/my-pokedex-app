import axios from "axios";

const API_URL = "http://localhost:5050";

interface AuthResponse {
	token: string;
	// add other response fields if needed
}

export const register = async (
	username: string,
	password: string
): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, {
		username,
		password,
	});

	const token = response.data.token;
	localStorage.setItem("token", token);

	return response.data;
};

export const login = async (
	username: string,
	password: string
): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>(`${API_URL}/auth/signin`, {
		username,
		password,
	});

	const token = response.data.token;
	localStorage.setItem("token", token);

	return response.data;
};

export const signout = async (): Promise<void> => {
	const token = localStorage.getItem("token");
	if (!token) throw new Error("No token found");

	await axios.post(
		`${API_URL}/auth/signout`,
		{},
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);

	localStorage.removeItem("token");
};
