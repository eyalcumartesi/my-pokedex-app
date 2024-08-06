import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, triangle } from "ionicons/icons";
import Tab2 from "./pages/SavedPokemonsList";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./index.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import GeneratePokemon from "./pages/GeneratePokemon";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ToolBar from "./components/ToolBar";
import { css } from "../styled-system/css";
import React, { useState, useEffect } from "react";

setupIonicReact();

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
	}, []);

	useEffect(() => {
		const handleStorageChange = () => {
			const token = localStorage.getItem("token");
			setIsAuthenticated(!!token);
		};

		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/generate">
							{isAuthenticated ? <GeneratePokemon /> : <Redirect to="/login" />}
						</Route>
						<Route exact path="/saved">
							{isAuthenticated ? <Tab2 /> : <Redirect to="/login" />}
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<SignUp />
						</Route>
						<Route exact path="/">
							<Redirect to="/generate" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar
						className={css({
							"--background": "#111111",
						})}
					>
						<IonTabButton tab="tab1" href="/generate">
							<IonIcon aria-hidden="true" icon={triangle} />
							<IonLabel>Generate</IonLabel>
						</IonTabButton>
						<IonTabButton tab="tab2" href="/saved">
							<IonIcon aria-hidden="true" icon={ellipse} />
							<IonLabel>Saved Pokemon</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
