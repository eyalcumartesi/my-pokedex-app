// src/hooks/usePokemon.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import localforage from "localforage";
import {
	fetchSavedPokemons,
	fetchRandomPokemon,
	savePokemon,
	deletePokemon,
	updatePokemon,
} from "../api/pokemon";
import { Pokemon } from "../types/Pokemon";

localforage.config({
	driver: localforage.INDEXEDDB,
	name: "my-pokedex-app",
	version: 1.0,
	storeName: "pokemons",
	description: "some description",
});

export const useSavedPokemons = () => {
	return useQuery({
		queryKey: ["savedPokemons"],
		queryFn: async () => {
			try {
				const onlineData = await fetchSavedPokemons();
				localforage.setItem("savedPokemons", onlineData);
				return onlineData;
			} catch (error) {
				const offlineData =
					await localforage.getItem<Pokemon[]>("savedPokemons");
				return offlineData || [];
			}
		},
	});
};

export const useRandomPokemon = () => {
	return useMutation({
		mutationFn: fetchRandomPokemon,
	});
};

export const useSavePokemon = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (pokemon: Pokemon) => {
			await savePokemon(pokemon);
			const savedPokemons =
				await localforage.getItem<Pokemon[]>("savedPokemons");
			const updatedPokemons = [...(savedPokemons || []), pokemon];
			await localforage.setItem("savedPokemons", updatedPokemons);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};

export const useDeletePokemon = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: string) => {
			await deletePokemon(id);
			const savedPokemons =
				await localforage.getItem<Pokemon[]>("savedPokemons");
			const updatedPokemons = (savedPokemons || []).filter(
				(pokemon: Pokemon) => pokemon.id !== id
			);
			await localforage.setItem("savedPokemons", updatedPokemons);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};

export const useUpdatePokemon = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (pokemon: Pokemon) => {
			await updatePokemon(pokemon);
			const savedPokemons =
				await localforage.getItem<Pokemon[]>("savedPokemons");
			const updatedPokemons = (savedPokemons || []).map((p: Pokemon) =>
				p.id === pokemon.id ? pokemon : p
			);
			await localforage.setItem("savedPokemons", updatedPokemons);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};
