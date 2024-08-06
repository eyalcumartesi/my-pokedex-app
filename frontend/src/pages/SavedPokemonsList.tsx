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
	SelectChangeEventDetail,
	IonSelectCustomEvent,
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
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [filterType, setFilterType] = useState<string>("");
	const [filters, setFilters] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(4);

	const { data: pokemons, isLoading, error } = useSavedPokemons();
	const deletePokemonMutation = useDeletePokemon();

	const handleDelete = useCallback(
		(id: number) => {
			deletePokemonMutation.mutate(id);
		},
		[deletePokemonMutation]
	);

	useEffect(() => {
		if (pokemons) {
			const newFilters = new Set(filters);
			pokemons.forEach((pok) => {
				pok.types.forEach((type) => {
					newFilters.add(type.type.name);
				});
			});
			setFilters(Array.from(newFilters));
		}
	}, [pokemons]);

	const handleSearchChange = useCallback(
		(event: IonInputCustomEvent<InputChangeEventDetail>) => {
			setSearchTerm(event.detail.value!);
			setCurrentPage(1);
		},
		[]
	);

	const handleFilterChange = useCallback(
		(event: IonSelectCustomEvent<SelectChangeEventDetail>) => {
			setFilterType(event.detail.value!);
			setCurrentPage(1);
		},
		[]
	);

	const handleItemsPerPageChange = useCallback(
		(event: IonSelectCustomEvent<SelectChangeEventDetail>) => {
			setItemsPerPage(parseInt(event.detail.value!, 10));
			setCurrentPage(1);
		},
		[]
	);

	const filteredPokemons = useMemo(() => {
		return pokemons?.filter((pokemon: Pokemon) => {
			return (
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(filterType
					? pokemon.types.some((type) => type.type.name === filterType)
					: true)
			);
		});
	}, [pokemons, searchTerm, filterType]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentPokemons = filteredPokemons?.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const totalPages = Math.ceil((filteredPokemons?.length || 0) / itemsPerPage);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	}, [currentPage, totalPages]);

	const handlePreviousPage = useCallback(() => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	}, [currentPage]);

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
						value={searchTerm}
						onIonChange={handleSearchChange}
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
							value={filterType}
							onIonChange={handleFilterChange}
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
							value={itemsPerPage.toString()}
							onIonChange={handleItemsPerPageChange}
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
										key={pokemon.id}
										sizeXs="12"
										sizeSm="12"
										sizeMd="6"
										sizeLg="4"
										sizeXl="3"
									>
										<PokemonCard
											key={pokemon.id}
											pokemon={pokemon}
											onDelete={handleDelete}
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
								onClick={handlePreviousPage}
								size="small"
								disabled={currentPage === 1}
							>
								Previous
							</IonButton>
							<IonButton
								size="small"
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
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
