import {
	IonButton,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { css } from "../../../styled-system/css";

const Login: React.FC = () => {
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const history = useHistory();
	const [isLoginLoading, setIsLoginLoading] = useState(false);

	const { mutate: loginMutate } = useLogin();

	const handleLogin = () => {
		setIsLoginLoading(true);
		const loginData = {
			username: user,
			password: password,
		};

		loginMutate(loginData, {
			onSuccess: () => {
				history.push("/generate");
			},
			onError: () => {
				setMessage("Auth failure! Please create an account");
				setIsError(true);
			},
		});
		setIsLoginLoading(false);
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
								<div style={{ marginBottom: "15px", width: "100%" }}>
									<input
										type="text"
										placeholder="user"
										value={user}
										onChange={(e) => setUser(e.target.value)}
										required
										style={{
											width: "100%",
											padding: "10px",
											borderRadius: "5px",
											border: "1px solid #ccc",
										}}
									/>
								</div>
								<div style={{ marginBottom: "15px", width: "100%" }}>
									<input
										type="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										style={{
											width: "100%",
											padding: "10px",
											borderRadius: "5px",
											border: "1px solid #ccc",
										}}
									/>
								</div>
								{isError && (
									<p style={{ color: "red", fontSize: "small" }}>{message}</p>
								)}
								<p style={{ fontSize: "small", textAlign: "center" }}>
									By clicking LOGIN you agree to our <a href="#">Policy</a>
								</p>
								<IonButton
									expand="block"
									onClick={handleLogin}
									disabled={isLoginLoading}
									style={{ marginTop: "10px" }}
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
