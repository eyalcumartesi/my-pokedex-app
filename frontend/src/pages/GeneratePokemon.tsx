import React, { useState } from "react";
import {
	IonButton,
	IonContent,
	IonHeader,
	IonPage,
	IonToolbar,
} from "@ionic/react";
import { useRandomPokemon, useSavePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../types/Pokemon";
import PokemonCard from "../components/PokemonCard";
import { css } from "../../styled-system/css";
import ToolBar from "../components/ToolBar";

const containerStyle = css({
	flexDirection: "center",
	alignItems: "center",
	marginTop: "2rem",
	display: "flex",
	gap: "1rem",
	overflowY: "scroll",
	justifyContent: "space-around",
	flexDir: "column",
});

const buttonStyle = css({
	padding: "1rem 2rem",
	"--background": "var(--ion-color-primary)",
	color: "#000",
	transition: "transform 0.3s ease",
	marginTop: "1rem",
});

const GeneratePokemon: React.FC = () => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const fetchRandomPokemonMutation = useRandomPokemon();
	const savePokemonMutation = useSavePokemon();

	const handleGeneratePokemon = () => {
		fetchRandomPokemonMutation.mutate(undefined, {
			onSuccess: (data) => {
				setPokemon(data);
			},
			onError: (error) => {
				console.error("Error fetching random pokemon:", error);
			},
		});
	};

	const handleSavePokemon = () => {
		if (pokemon) {
			savePokemonMutation.mutate(pokemon);
		}
	};

	return (
		<IonPage>
			<IonHeader>
				<ToolBar />
			</IonHeader>
			<IonContent class="ion-padding">
				<span className={containerStyle}>
					<IonButton
						size="small"
						className={buttonStyle}
						onClick={handleGeneratePokemon}
					>
						Generate Random Pokemon
					</IonButton>
					{pokemon && (
						<>
							<PokemonCard pokemon={pokemon} size="big" />

							<IonButton size="small" onClick={handleSavePokemon}>
								Save Pokemon
							</IonButton>
						</>
					)}
				</span>
			</IonContent>
		</IonPage>
	);
};

export default GeneratePokemon;
