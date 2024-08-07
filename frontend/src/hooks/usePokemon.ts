import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	fetchSavedPokemons,
	fetchRandomPokemon,
	savePokemon,
	deletePokemon,
	updatePokemon,
} from "../api/pokemon";
import { Pokemon } from "../types/Pokemon";

export const useSavedPokemons = () => {
	return useQuery({
		queryKey: ["savedPokemons"],
		queryFn: fetchSavedPokemons,
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
		mutationFn: (pokemon: Pokemon) => savePokemon(pokemon),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};

export const useUpdatePokemon = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (pokemon: Pokemon) => updatePokemon(pokemon),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};

export const useDeletePokemon = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deletePokemon(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["savedPokemons"] });
		},
	});
};
