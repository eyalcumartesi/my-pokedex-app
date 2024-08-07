// src/components/PokemonCard.tsx
import React, { useState } from "react";
import { css } from "../../styled-system/css";
import { Pokemon } from "../types/Pokemon";
import {
	IonButton,
	IonCard,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonItem,
	IonList,
	IonText,
	IonModal,
} from "@ionic/react";
import EditPokemonForm from "./EditPokemonForm";

const cardStyle = (size: "small" | "big") =>
	css({
		backgroundColor: "var(--ion-background-color)",
		width:
			size === "big"
				? { smDown: "20rem", smTo2xl: "20rem" }
				: { smDown: "100%", smTo2xl: "100%" },
		minHeight:
			size === "big"
				? { smDown: "25rem", smTo2xl: "30rem" }
				: { smDown: "30rem", smTo2xl: "30rem" },
		color: "#00ff00",
		border: "3px solid #00cc00",
		borderRadius: "12px",
		boxShadow: "0 4px 8px rgba(0, 255, 0, 0.4)",
		padding:
			size === "big"
				? { smDown: "0 0 2rem 0", smTo2xl: "0 0rem" }
				: { smDown: "0 0 1rem 0", smTo2xl: "3rem" },
		fontFamily: "Press Start 2P, monospace",
		display: "flex",
		gap: "0.5rem",
		flexDirection: "column",
		justifyContent: "start",
		alignItems: "center",
		textAlign: "left",
		"& img": {
			width: "100%",
			height: "10em",

			objectFit: "contain",
			backgroundColor: "rgba(255,255,255,0.1)",
			marginBottom: size === "big" ? "10rem" : "5rem",
		},
		"& h3": {
			fontSize: size === "big" ? "0.8rem" : "0.4rem",
			margin: "0.5rem 0",
		},
		"& p": {
			fontSize: size === "big" ? "0.6rem" : "0.3rem",
			margin: "0.2rem 0",
		},
	});

const PokemonCard: React.FC<{
	pokemon: Pokemon;
	onDelete?: (id: string) => void;
	size: "small" | "big";
}> = ({ pokemon, onDelete, size }) => {
	const [showEditModal, setShowEditModal] = useState(false);

	return (
		<>
			<IonCard className={cardStyle(size)}>
				{pokemon.sprites ? (
					<img src={pokemon.sprites?.front_default} alt={pokemon.name} />
				) : (
					<div
						className={css({
							width: "100%",
							height: "10em",
							objectFit: "contain",
							backgroundColor: "rgba(255,255,255,0.1)",
							marginBottom: size === "big" ? "10rem" : "5rem",
						})}
					></div>
				)}
				<IonCardHeader
					className={css({
						mb: size === "big" ? "5" : "2.5",
					})}
				>
					<IonCardTitle
						className={css({
							color: "white",
							fontSize: size === "big" ? "1.5rem" : "1rem",
						})}
					>
						{pokemon.name}
					</IonCardTitle>
				</IonCardHeader>
				<IonContent>
					<IonList
						className={css({
							fontSize: "small",
							margin: 0,
							"& ion-item": {
								margin: 0,
							},
						})}
						inset={true}
					>
						<IonItem slot="start">
							<IonText
								className={css({
									fontSize: size === "big" ? "x-small" : "xx-small",
								})}
							>
								Height: {pokemon.height / 10} m
							</IonText>
						</IonItem>
						<IonItem slot="start">
							<IonText
								className={css({
									fontSize: size === "big" ? "x-small" : "xx-small",
								})}
							>
								Weight: {pokemon.weight / 10} kg
							</IonText>
						</IonItem>
						<IonItem slot="start">
							<IonText
								className={css({
									fontSize: size === "big" ? "x-small" : "xx-small",
								})}
							>
								Base Experience: {pokemon.base_experience}
							</IonText>
						</IonItem>
						<IonItem slot="start">
							<IonText
								className={css({
									fontSize: size === "big" ? "x-small" : "xx-small",
								})}
							>
								Type: {pokemon.types.map((type) => type.type.name).join(", ")}
							</IonText>
						</IonItem>
						<IonItem slot="start">
							<IonText
								className={css({
									fontSize: size === "big" ? "x-small" : "xx-small",
								})}
							>
								Abilities:{" "}
								{pokemon.abilities
									.map((ability) => ability.ability.name)
									.join(", ")}
							</IonText>
						</IonItem>
					</IonList>
				</IonContent>
				{onDelete && (
					<IonCardSubtitle>
						<IonButton
							size="small"
							className={css({
								fontSize: size === "big" ? "2rem" : "0.5rem",
							})}
							onClick={() => onDelete(pokemon.pokemon_id)}
						>
							Delete
						</IonButton>
						<IonButton
							size="small"
							className={css({
								fontSize: size === "big" ? "2rem" : "0.5rem",
							})}
							onClick={() => setShowEditModal(true)}
						>
							Edit
						</IonButton>
					</IonCardSubtitle>
				)}
			</IonCard>
			<IonModal
				isOpen={showEditModal}
				onDidDismiss={() => setShowEditModal(false)}
			>
				<EditPokemonForm
					pokemon={pokemon}
					onClose={() => setShowEditModal(false)}
				/>
			</IonModal>
		</>
	);
};

export default PokemonCard;
