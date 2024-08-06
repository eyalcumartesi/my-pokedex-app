import { useMutation, useQuery } from "@tanstack/react-query";
import {
	login,
	register,
	signout,
	verify2FA,
	validateToken,
} from "../api/auth";

export const useLogin = () => {
	return useMutation({
		mutationFn: ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => login(username, password),
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: ({
			username,
			password,
		}: {
			username: string;
			password: string;
		}) => register(username, password),
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: () => signout(),
	});
};

export const use2FA = () => {
	return useMutation({
		mutationFn: ({ token, code }: { token: string; code: string }) =>
			verify2FA(token, code),
	});
};

export const useAuth = () => {
	return useQuery({
		queryKey: ["auth"],
		queryFn: validateToken,
	});
};
