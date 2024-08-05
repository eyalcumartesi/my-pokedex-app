import { useMutation } from "@tanstack/react-query";
import { login, register, signout } from "../api/auth";

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
