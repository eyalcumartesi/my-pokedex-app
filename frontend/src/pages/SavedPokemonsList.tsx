import React, { useState, useEffect, useRef } from "react";
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
} from "@ionic/react";
import { css } from "../../styled-system/css";
import { useSavedPokemons, useDeletePokemon } from "../hooks/usePokemon";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../types/Pokemon";

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
	// Set a fixed height for the container
});

const itemsPerPage = 4; // Number of items per page

const SavedPokemons: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("");
	const [filters, setFilters] = useState<string[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	const { data: pokemons, isLoading, error } = useSavedPokemons();
	const deletePokemonMutation = useDeletePokemon();

	const handleDelete = (id: number) => {
		deletePokemonMutation.mutate(id);
	};

	useEffect(() => {
		if (pokemons) {
			const newFilters = new Set(filters);
			pokemons.forEach((pok) => {
				pok.types.forEach((type) => {
					if (!newFilters.has(type.type.name)) {
						newFilters.add(type.type.name);
					}
				});
			});
			setFilters(Array.from(newFilters));
		}
	}, [pokemons]);

	const handleSearchChange = (event: React.FormEvent<HTMLIonInputElement>) => {
		setSearchTerm((event.target as HTMLInputElement).value);
		setCurrentPage(1); // Reset to first page on search
	};

	const handleFilterChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setFilterType(event.target.value);
		setCurrentPage(1); // Reset to first page on filter change
	};

	const filteredPokemons = pokemons?.filter((pokemon: Pokemon) => {
		return (
			pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(filterType
				? pokemon.types.some((type) => type.type.name === filterType)
				: true)
		);
	});

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentPokemons = filteredPokemons?.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const totalPages = Math.ceil((filteredPokemons?.length || 0) / itemsPerPage);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<IonPage>
			<IonContent
				fullscreen={true}
				class="ion-padding has-header"
				overflow-scroll="true"
			>
				<IonInput
					type="text"
					placeholder="Search Pokémon"
					value={searchTerm}
					onIonChange={handleSearchChange}
				/>

				<IonSelect value={filterType} onIonChange={handleFilterChange}>
					<IonSelectOption value={""}>ALL TYPES</IonSelectOption>
					{filters.map((filter) => (
						<IonSelectOption key={filter} value={filter.toLowerCase()}>
							{filter.toUpperCase()}
						</IonSelectOption>
					))}
					{/* Add more types as needed */}
				</IonSelect>

				<IonGrid
					className={css({
						"--padding-horizontal": "1rem",
					})}
				>
					<IonRow class="ion-margin">
						{currentPokemons?.map((pokemon: Pokemon) => (
							<IonCol
								key={pokemon.id}
								sizeXs={"6"}
								sizeSm={"10"}
								sizeMd={"6"}
								sizeLg={"4"}
								sizeXl={"4"}
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
			</IonContent>
		</IonPage>
	);
};

export default SavedPokemons;
