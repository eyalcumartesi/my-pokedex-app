import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonHeader,
	IonToolbar,
	setupIonicReact,
	IonButton,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, triangle } from "ionicons/icons";
import Tab2 from "./pages/SavedPokemonsList";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./index.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
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
		console.log(isAuthenticated);
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
						slot="bottom"
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
