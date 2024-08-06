import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

interface AuthResponse {
	token: string;
	twoFactorRequired?: boolean;
	qrCode?: string;
}

interface ValidateTokenResponse {
	valid: boolean;
}

export const register = async (
	username: string,
	password: string
): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, {
		username,
		password,
	});
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
	if (!response.data.twoFactorRequired) {
		localStorage.setItem("token", response.data.token);
	}
	return response.data;
};

export const signout = async (): Promise<void> => {
	const token = localStorage.getItem("token");
	if (!token) throw new Error("No token found");

	await axios.post(
		`${API_URL}/auth/signout`,
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	localStorage.removeItem("token");
};

export const verify2FA = async (
	token: string,
	code: string
): Promise<AuthResponse> => {
	const response = await axios.post<AuthResponse>(
		`${API_URL}/auth/verify-2fa`,
		{ token, code }
	);
	localStorage.setItem("token", response.data.token);
	return response.data;
};

export const validateToken = async (): Promise<ValidateTokenResponse> => {
	const token = localStorage.getItem("token");
	if (!token) return { valid: false };

	const response = await axios.post<ValidateTokenResponse>(
		`${API_URL}/auth/validate-token`,
		{},
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return response.data;
};
