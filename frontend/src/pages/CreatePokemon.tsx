// src/pages/CreatePokemon.tsx
import React, { useState } from "react";
import {
	IonPage,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonInput,
	IonButton,
	IonItem,
	IonLabel,
	IonTextarea,
	IonSelect,
	IonSelectOption,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { useHistory } from "react-router-dom";
import { useSavePokemon } from "../hooks/usePokemon";
import { input, select } from "../theme/recipes";

const inputStyle = css({
	width: "100%",
	margin: "10px 0",
});

const buttonStyle = css({
	marginTop: "20px",
});

const CreatePokemon: React.FC = () => {
	const [name, setName] = useState("");
	const [height, setHeight] = useState<number | string>("");
	const [weight, setWeight] = useState<number | string>("");
	const [baseExperience, setBaseExperience] = useState<number | string>("");
	const [types, setTypes] = useState<string[]>([]);
	const [abilities, setAbilities] = useState<string[]>([]);
	const [sprites, setSprites] = useState({
		front_default: "",
		back_default: "",
	});

	const history = useHistory();
	const savePokemonMutation = useSavePokemon();

	const handleSavePokemon = () => {
		const newPokemon = {
			id: Math.random().toString(36).substr(2, 9),
			name,
			height: Number(height),
			weight: Number(weight),
			base_experience: Number(baseExperience),
			types: types.map((type) => ({ slot: 1, type: { name: type, url: "" } })),
			abilities: abilities.map((ability) => ({
				is_hidden: false,
				slot: 1,
				ability: { name: ability, url: "" },
			})),
			sprites,
		};

		savePokemonMutation.mutate(newPokemon, {
			onSuccess: () => {
				history.push("/saved");
			},
		});
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Create New Pokémon</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding-xl">
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Name
					</IonLabel>
					<IonInput
						type="text"
						value={name}
						onIonChange={(e) => setName(e.detail.value!)}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Height (dm)
					</IonLabel>
					<IonInput
						type="number"
						value={height}
						onIonChange={(e) => setHeight(e.detail.value!)}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Weight (hg)
					</IonLabel>
					<IonInput
						type="number"
						value={weight}
						onIonChange={(e) => setWeight(e.detail.value!)}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Base Experience
					</IonLabel>
					<IonInput
						type="number"
						value={baseExperience}
						onIonChange={(e) => setBaseExperience(e.detail.value!)}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Types
					</IonLabel>
					<IonSelect
						multiple
						value={types}
						onIonChange={(e) => setTypes(e.detail.value!)}
						className={select({ size: "lg" })}
					>
						<IonSelectOption value="normal">Normal</IonSelectOption>
						<IonSelectOption value="fire">Fire</IonSelectOption>
						<IonSelectOption value="water">Water</IonSelectOption>
						<IonSelectOption value="grass">Grass</IonSelectOption>
						<IonSelectOption value="electric">Electric</IonSelectOption>
						<IonSelectOption value="ice">Ice</IonSelectOption>
						<IonSelectOption value="fighting">Fighting</IonSelectOption>
						<IonSelectOption value="poison">Poison</IonSelectOption>
						<IonSelectOption value="ground">Ground</IonSelectOption>
						<IonSelectOption value="flying">Flying</IonSelectOption>
						<IonSelectOption value="psychic">Psychic</IonSelectOption>
						<IonSelectOption value="bug">Bug</IonSelectOption>
						<IonSelectOption value="rock">Rock</IonSelectOption>
						<IonSelectOption value="ghost">Ghost</IonSelectOption>
						<IonSelectOption value="dark">Dark</IonSelectOption>
						<IonSelectOption value="dragon">Dragon</IonSelectOption>
						<IonSelectOption value="steel">Steel</IonSelectOption>
						<IonSelectOption value="fairy">Fairy</IonSelectOption>
					</IonSelect>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Abilities
					</IonLabel>
					<IonTextarea
						placeholder="Enter abilities separated by commas"
						value={abilities.join(", ")}
						onIonChange={(e) =>
							setAbilities(e.detail.value!.split(",").map((a) => a.trim()))
						}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Front Sprite URL
					</IonLabel>
					<IonInput
						type="url"
						value={sprites.front_default}
						onIonChange={(e) =>
							setSprites((prev) => ({
								...prev,
								front_default: e.detail.value!,
							}))
						}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonItem className="ion-margin">
					<IonLabel position="stacked" class="ion-margin-vertical">
						Back Sprite URL
					</IonLabel>
					<IonInput
						type="url"
						value={sprites.back_default}
						onIonChange={(e) =>
							setSprites((prev) => ({
								...prev,
								back_default: e.detail.value!,
							}))
						}
						className={input({ size: "md" })}
					/>
				</IonItem>
				<IonButton
					expand="full"
					onClick={handleSavePokemon}
					className={buttonStyle}
				>
					Save Pokemon
				</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default CreatePokemon;
