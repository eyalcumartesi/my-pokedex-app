import { IonButton, IonToolbar } from "@ionic/react";
import React from "react";
import { useLogout } from "../hooks/useAuth"; // Ensure the correct path to the hook
import { css } from "../../styled-system/css";
import { useHistory } from "react-router";

const ToolBar: React.FC = () => {
	const { mutate: logoutMutate, isPending: isLogoutLoading } = useLogout();
	const history = useHistory();

	const handleLogout = () => {
		logoutMutate(undefined, {
			onSuccess: () => {
				history.push("/login");
			},
		});
	};

	return (
		<IonToolbar className={css({ "--background": "#11111" })}>
			<IonButton size="small" onClick={handleLogout} disabled={isLogoutLoading}>
				{isLogoutLoading ? "Logging out..." : "Logout"}
			</IonButton>
		</IonToolbar>
	);
};

export default ToolBar;
