import React, { useState, useEffect, lazy, Suspense } from "react";
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
import { css } from "../styled-system/css";

setupIonicReact();

const GeneratePokemon = lazy(() => import("./pages/GeneratePokemon"));
const SavedPokemonsList = lazy(() => import("./pages/SavedPokemonsList"));
const Login = lazy(() => import("./pages/auth/Login"));
const SignUp = lazy(() => import("./pages/auth/SignUp"));
const CreatePokemon = lazy(() => import("./pages/CreatePokemon"));

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isPending, setIsPending] = useState<boolean>(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAuthenticated(!!token);
		setIsPending(false);
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

	if (isPending) return <div>Loading...</div>;

	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Suspense fallback={<div>Loading...</div>}>
							<Route exact path="/generate">
								{isAuthenticated ? (
									<GeneratePokemon />
								) : (
									<Redirect to="/login" />
								)}
							</Route>
							<Route exact path="/saved">
								{isAuthenticated ? (
									<SavedPokemonsList />
								) : (
									<Redirect to="/login" />
								)}
							</Route>
							<Route exact path="/create">
								{isAuthenticated ? <CreatePokemon /> : <Redirect to="/login" />}
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
						</Suspense>
					</IonRouterOutlet>
					<IonTabBar
						className={css({
							"--background": "black",
						})}
						slot="bottom"
					>
						<IonTabButton
							disabled={!isAuthenticated}
							tab="tab1"
							href="/generate"
						>
							<IonIcon aria-hidden="true" icon={triangle} />
							<IonLabel>Generate</IonLabel>
						</IonTabButton>
						<IonTabButton disabled={!isAuthenticated} tab="tab2" href="/saved">
							<IonIcon aria-hidden="true" icon={ellipse} />
							<IonLabel>Saved Pokemon</IonLabel>
						</IonTabButton>
						<IonTabButton disabled={!isAuthenticated} tab="tab3" href="/create">
							<IonIcon aria-hidden="true" icon={ellipse} />
							<IonLabel>Create</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	);
};

export default App;
