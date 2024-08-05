// SignUp.tsx
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
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const history = useHistory();

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			setIsError(true);
			return;
		}

		const signUpData = {
			username: username,
			password: password,
		};

		try {
			await axios.post("http://localhost:5050/auth/signup", signUpData);
			history.push("/generate");
		} catch (error) {
			setMessage("Registration failed! Please try again.");
			setIsError(true);
		}
	};

	return (
		<IonPage>
			<IonContent class="ion-padding">
				<IonHeader>
					<IonTitle>Sign Up</IonTitle>
				</IonHeader>

				<IonRow style={{ justifyContent: "center", marginTop: "20px" }}>
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
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
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
							<div style={{ marginBottom: "15px", width: "100%" }}>
								<input
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
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
							<IonButton
								expand="block"
								onClick={handleSignUp}
								style={{ marginTop: "10px" }}
							>
								Sign Up
							</IonButton>
							<p
								style={{
									fontSize: "medium",
									textAlign: "center",
									marginTop: "15px",
								}}
							>
								Already have an account? <a href="/login">Login</a>
							</p>
						</form>
					</IonCol>
				</IonRow>
			</IonContent>
		</IonPage>
	);
};

export default SignUp;
