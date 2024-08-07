// src/components/EditPokemonForm.tsx
import React, { useState } from "react";
import {
	IonButton,
	IonContent,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonTextarea,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { Pokemon } from "../types/Pokemon";
import { useUpdatePokemon } from "../hooks/usePokemon";
import { input, select } from "../theme/recipes";

const inputStyle = css({
	width: "100%",
	margin: "10px 0",
});

const buttonStyle = css({
	marginTop: "20px",
});

const EditPokemonForm: React.FC<{ pokemon: Pokemon; onClose: () => void }> = ({
	pokemon,
	onClose,
}) => {
	const [name, setName] = useState(pokemon.name);
	const [height, setHeight] = useState(pokemon.height);
	const [weight, setWeight] = useState(pokemon.weight);
	const [baseExperience, setBaseExperience] = useState(pokemon.base_experience);
	const [types, setTypes] = useState(
		pokemon.types.map((type) => type.type.name)
	);
	const [abilities, setAbilities] = useState(
		pokemon.abilities.map((ability) => ability.ability.name)
	);
	const [sprites, setSprites] = useState(pokemon.sprites);

	const updatePokemonMutation = useUpdatePokemon();

	const handleUpdatePokemon = () => {
		const updatedPokemon = {
			...pokemon,
			name,
			height,
			weight,
			base_experience: baseExperience,
			types: types.map((type) => ({ slot: 1, type: { name: type, url: "" } })),
			abilities: abilities.map((ability) => ({
				is_hidden: false,
				slot: 1,
				ability: { name: ability, url: "" },
			})),
			sprites,
		};

		console.log(updatedPokemon);

		updatePokemonMutation.mutate(updatedPokemon, {
			onSuccess: () => {
				onClose();
			},
		});
	};

	return (
		<IonContent class="ion-padding">
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Name
				</IonLabel>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value!)}
					className={input({ size: "sm" })}
				/>
			</IonItem>
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Height (dm)
				</IonLabel>
				<input
					type="number"
					value={height}
					onChange={(e) => setHeight(Number(e.target.value!))}
					className={input({ size: "sm" })}
				/>
			</IonItem>
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Weight (hg)
				</IonLabel>
				<input
					type="number"
					value={weight}
					onChange={(e) => setWeight(Number(e.target.value!))}
					className={input({ size: "sm" })}
				/>
			</IonItem>
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Base Experience
				</IonLabel>
				<input
					type="number"
					value={baseExperience}
					onChange={(e) => setBaseExperience(Number(e.target.value!))}
					className={input({ size: "sm" })}
				/>
			</IonItem>
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Types
				</IonLabel>
				<IonSelect
					multiple
					value={types}
					onIonChange={(e) => setTypes(e.detail.value!)}
					className={select({ size: "sm" })}
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
			<IonItem>
				<IonLabel class="ion-margin" position="fixed">
					Abilities
				</IonLabel>
				<IonTextarea
					placeholder="Enter abilities separated by commas"
					value={abilities.join(", ")}
					onIonChange={(e) =>
						setAbilities(e.detail.value!.split(",").map((a) => a.trim()))
					}
					className={input({ size: "sm" })}
				/>
			</IonItem>

			<IonButton
				expand="block"
				onClick={handleUpdatePokemon}
				className="ion-margin"
			>
				Update Pokémon
			</IonButton>
			<IonButton expand="block" onClick={onClose} className="ion-margin">
				Cancel
			</IonButton>
		</IonContent>
	);
};

export default EditPokemonForm;
