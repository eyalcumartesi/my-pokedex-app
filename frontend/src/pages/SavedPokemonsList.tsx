import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
	IonCol,
	IonContent,
	IonGrid,
	IonInput,
	IonPage,
	IonRow,
	IonSelect,
	IonSelectOption,
	IonButton,
	IonText,
	IonTitle,
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { useSavedPokemons, useDeletePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types/Pokemon";
import {
	IonInputCustomEvent,
	InputChangeEventDetail,
	IonSelectCustomEvent,
	SelectChangeEventDetail,
} from "@ionic/core";
import { input, select } from "../theme/recipes";

const filterContainerStyle = css({
	display: "flex",
	justifyContent: "space-around",
	marginBottom: "1rem",
});

const containerStyle = css({
	flexDirection: "center",
	alignItems: "center",
	marginTop: "2rem",
	display: "flex",
	gap: "1rem",
	padding: "0 10rem",
	overflowY: "auto",
	justifyContent: "space-around",
	flexDir: "column",
	width: "100vw",
});

const itemsPerPageOptions = [2, 4, 6, 8, 10];

const SavedPokemons: React.FC = () => {
	const [state, setState] = useState({
		searchTerm: "",
		filterType: "",
		currentPage: 1,
		itemsPerPage: 4,
	});
	const [filters, setFilters] = useState<string[]>([]);

	const { data: pokemons, isLoading, error } = useSavedPokemons();
	const deletePokemonMutation = useDeletePokemon();

	const handleDelete = useCallback(
		(id: string) => {
			deletePokemonMutation.mutate(id);
		},
		[deletePokemonMutation]
	);

	useEffect(() => {
		if (pokemons) {
			const newFilters = new Set<string>();
			pokemons.forEach((pok) => {
				pok.types.forEach((type) => {
					newFilters.add(type.type.name);
				});
			});
			setFilters(Array.from(newFilters));
		}
	}, [pokemons]);

	const handleInputChange = useCallback(
		(e: IonInputCustomEvent<InputChangeEventDetail>, field: string) => {
			setState((prevState) => ({
				...prevState,
				[field]: e.detail.value!,
				currentPage: 1, // Reset to the first page when filters or search terms change
			}));
		},
		[]
	);

	const handleSelectChange = useCallback(
		(e: IonSelectCustomEvent<SelectChangeEventDetail>, field: string) => {
			setState((prevState) => ({
				...prevState,
				[field]: e.detail.value!,
				currentPage: 1, // Reset to the first page when filters or search terms change
			}));
		},
		[]
	);

	const filteredPokemons = useMemo(() => {
		return pokemons?.filter((pokemon: Pokemon) => {
			return (
				pokemon.name.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
				(state.filterType
					? pokemon.types.some((type) => type.type.name === state.filterType)
					: true)
			);
		});
	}, [pokemons, state.searchTerm, state.filterType]);

	const indexOfLastItem = state.currentPage * state.itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - state.itemsPerPage;
	const currentPokemons = filteredPokemons?.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const totalPages = Math.ceil(
		(filteredPokemons?.length || 0) / state.itemsPerPage
	);

	const handlePageChange = useCallback((direction: "next" | "prev") => {
		setState((prevState) => ({
			...prevState,
			currentPage:
				direction === "next"
					? prevState.currentPage + 1
					: prevState.currentPage - 1,
		}));
	}, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<IonPage>
			<IonContent fullscreen={true} class="ion-padding" overflow-scroll="true">
				<span
					className={css({
						display: "flex",
						width: "90vw",
						gap: "10px",
						flexDirection: "column",
						alignItems: "center",
					})}
				>
					<IonInput
						type="text"
						className={input({ size: "lg" })}
						placeholder="Search Pokémon"
						value={state.searchTerm}
						onIonChange={(e) => handleInputChange(e, "searchTerm")}
					/>
					<span
						className={css({
							display: "flex",
							width: "100%",
							alignItems: "center",
						})}
					>
						<IonText
							className={css({
								fontSize: "xs",
							})}
							color={"primary"}
						>
							Pokemon Type
						</IonText>
						<IonSelect
							className={select({ size: "md" })}
							value={state.filterType}
							onIonChange={(e) => handleSelectChange(e, "filterType")}
						>
							<IonSelectOption value={""}>ALL TYPES</IonSelectOption>
							{filters.map((filter) => (
								<IonSelectOption key={filter} value={filter.toLowerCase()}>
									{filter.toUpperCase()}
								</IonSelectOption>
							))}
						</IonSelect>
					</span>
					<span
						className={css({
							display: "flex",
							width: "100%",
							justifyContent: "space-around",
							alignItems: "center",
						})}
					>
						<IonText
							className={css({
								fontSize: "xs",
							})}
							color={"primary"}
						>
							Cards Per Page
						</IonText>
						<IonSelect
							className={select({ size: "md" })}
							value={state.itemsPerPage.toString()}
							onIonChange={(e) => handleSelectChange(e, "itemsPerPage")}
						>
							{itemsPerPageOptions.map((option) => (
								<IonSelectOption key={option} value={option.toString()}>
									{option}
								</IonSelectOption>
							))}
						</IonSelect>
					</span>
				</span>

				{pokemons?.length !== 0 ? (
					<>
						<IonGrid
							className={css({
								"--padding-horizontal": "1rem",
							})}
						>
							<IonRow class="ion-margin">
								{currentPokemons?.map((pokemon: Pokemon) => (
									<IonCol
										key={pokemon.pokemon_id}
										sizeXs="12"
										sizeSm="12"
										sizeMd="6"
										sizeLg="4"
										sizeXl="3"
									>
										<PokemonCard
											key={pokemon.pokemon_id}
											pokemon={pokemon}
											onDelete={() => handleDelete(pokemon.pokemon_id)}
											size="small"
										/>
									</IonCol>
								))}
							</IonRow>
						</IonGrid>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								margin: "1rem",
								gap: "2rem",
							}}
						>
							<IonButton
								onClick={() => handlePageChange("prev")}
								size="small"
								disabled={state.currentPage === 1}
							>
								Previous
							</IonButton>
							<IonButton
								size="small"
								onClick={() => handlePageChange("next")}
								disabled={state.currentPage === totalPages}
							>
								Next
							</IonButton>
						</span>
					</>
				) : (
					<IonText>Go Generate And Save Some Pokemons!!!</IonText>
				)}
			</IonContent>
		</IonPage>
	);
};

export default SavedPokemons;
