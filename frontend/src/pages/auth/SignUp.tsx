import {
	IonButton,
	IonCol,
	IonContent,
	IonHeader,
	IonIcon,
	IonPage,
	IonRow,
	IonTitle,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignUp: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [signedUp, setSignedUp] = useState<boolean>(false);
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);
	const [qrCode, setQrCode] = useState<string>("");
	const history = useHistory();

	const handleSignUp = async () => {
		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
			setIsError(true);
			return;
		}

		const signUpData = { username, password };

		try {
			const response = await axios.post(
				import.meta.env.VITE_API_BASE_URL + "/auth/signup",
				signUpData
			);
			console.log(response);
			setQrCode(response.data.qrCode);
			setSignedUp(true);
			setMessage("Please scan the QR code with your 2FA app.");
			setIsError(false);
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
							{!isError && qrCode && (
								<>
									<p>{message}</p>
									<img src={qrCode} alt="2FA QR Code" />
								</>
							)}
							{!signedUp ? (
								<IonButton
									expand="block"
									onClick={handleSignUp}
									style={{ marginTop: "10px" }}
								>
									Sign Up
								</IonButton>
							) : (
								<IonButton
									expand="block"
									onClick={() => history.push("/login")}
									style={{ marginTop: "10px" }}
								>
									Finish
								</IonButton>
							)}
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
