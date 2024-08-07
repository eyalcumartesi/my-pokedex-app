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
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLogin, use2FA } from "../../hooks/useAuth";
import { css } from "../../../styled-system/css";
import { button, input } from "../../theme/recipes";

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

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
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

	const handle2FA = (event: React.FormEvent) => {
		event.preventDefault();
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

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar
					className={css({
						"--background": "black",
					})}
				>
					<IonTitle>Login</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent class="ion-padding">
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
							onSubmit={is2FARequired ? handle2FA : handleLogin}
						>
							<IonInput
								type="text"
								placeholder="User"
								value={user}
								className={input({ size: "md" })}
								onIonChange={(e: CustomEvent) => setUser(e.detail.value!)}
								required
							/>
							<IonInput
								type="password"
								placeholder="Password"
								value={password}
								className={input({ size: "md" })}
								onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
								required
							/>
							{is2FARequired && (
								<IonInput
									type="text"
									placeholder="2FA Code"
									value={code}
									className={input({ size: "md" })}
									onIonChange={(e: CustomEvent) =>
										setCode(e.detail.value!.replace(/\D/g, ""))
									}
									required
								/>
							)}
							{isError && (
								<p style={{ color: "red", fontSize: "small" }}>{message}</p>
							)}
							<IonButton
								type="submit"
								expand="block"
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
			</IonContent>
		</IonPage>
	);
};

export default Login;
