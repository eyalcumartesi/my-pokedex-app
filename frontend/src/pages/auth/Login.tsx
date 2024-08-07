import {
	IonButton,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLogin, use2FA } from "../../hooks/useAuth";
import { css } from "../../../styled-system/css";
import { button, input } from "../../theme/recipes";
import { IonInputCustomEvent, InputChangeEventDetail } from "@ionic/core";

const Login: React.FC = () => {
	const [user, setUser] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [code, setCode] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);
	const [is2FARequired, setIs2FARequired] = useState<boolean>(false);
	const [token, setToken] = useState<string>("");
	const history = useHistory();
	const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

	const { mutate: loginMutate } = useLogin();
	const { mutate: verify2FAMutate } = use2FA();

	const handleLogin = () => {
		setIsLoginLoading(true);
		loginMutate(
			{ username: user, password: password },
			{
				onSuccess: (data) => {
					if (data.twoFactorRequired) {
						setToken(data.token);
						setIs2FARequired(true);
					} else {
						localStorage.setItem("token", data.token);
						history.push("/generate");
					}
					setIsLoginLoading(false);
				},
				onError: () => {
					setMessage("Auth failure! Please create an account");
					setIsError(true);
					setIsLoginLoading(false);
				},
			}
		);
	};

	const handle2FA = () => {
		verify2FAMutate(
			{ token, code },
			{
				onSuccess: (data) => {
					localStorage.setItem("token", data.token);
					history.push("/generate");
				},
				onError: () => {
					setMessage("2FA verification failed!");
					setIsError(true);
				},
			}
		);
	};

	const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser(e.target.value!);
	};

	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value!);
	};

	const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value!;
		value = value.replace(/\D/g, "");
		setCode(value);
	};

	return (
		<IonPage>
			<IonContent class="ion-padding">
				<IonHeader
					className={css({
						"--background": "var(--ion-color-primary)",
					})}
				>
					<IonTitle>Login</IonTitle>
				</IonHeader>
				<span
					className={css({
						display: "flex",
						flexDirection: "column",
						gap: "5",
						alignItems: "column",
					})}
				>
					<IonRow
						style={{ justifyContent: "center", marginTop: "20px", gap: "2rem" }}
					>
						<IonCol style={{ textAlign: "center" }}>
							<IonIcon
								style={{ fontSize: "70px", color: "#0040ff" }}
								icon={personCircle}
							/>
						</IonCol>
					</IonRow>

					<IonRow style={{ justifyContent: "center", marginTop: "20px" }}>
						<IonCol size="12" size-md="6">
							<form
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
							>
								<span style={{ marginBottom: "15px", width: "100%" }}>
									<input
										type="text"
										placeholder="user"
										value={user}
										className={input({ size: "md" })}
										onChange={handleUserChange}
										required
									/>
								</span>
								<span style={{ marginBottom: "15px", width: "100%" }}>
									<input
										type="password"
										className={input({ size: "md" })}
										placeholder="Password"
										value={password}
										onChange={handlePasswordChange}
										required
									/>
								</span>
								{is2FARequired && (
									<span style={{ marginBottom: "15px", width: "100%" }}>
										<input
											type="text"
											name="2fa"
											className={input({ size: "md" })}
											placeholder="2FA Code"
											onChange={handleCodeChange}
											required
										/>
									</span>
								)}
								{isError && (
									<p style={{ color: "red", fontSize: "small" }}>{message}</p>
								)}
								<IonButton
									expand="block"
									onClick={is2FARequired ? handle2FA : handleLogin}
									disabled={isLoginLoading}
									className={button({ visual: "solid", size: "lg" })}
								>
									{isLoginLoading ? "Logging in..." : "Login"}
								</IonButton>
								<p
									style={{
										fontSize: "medium",
										textAlign: "center",
										marginTop: "15px",
									}}
								>
									Don't have an account? <a href="/signup">Sign up!</a>
								</p>
							</form>
						</IonCol>
					</IonRow>
				</span>
			</IonContent>
		</IonPage>
	);
};

export default Login;
