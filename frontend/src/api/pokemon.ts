import axios from "axios";
import { Pokemon } from "../types/Pokemon";

const getToken = () => localStorage.getItem("token");

export const fetchSavedPokemons = async (): Promise<Pokemon[]> => {
	const token = getToken();
	const { data } = await axios.get(
		import.meta.env.VITE_API_BASE_URL + "/pokemon/save",
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data;
};

export const fetchRandomPokemon = async (): Promise<Pokemon> => {
	const { data } = await axios.get(
		import.meta.env.VITE_API_BASE_URL + "/pokemon/random"
	);
	return data;
};

export const savePokemon = async (pokemon: Pokemon): Promise<void> => {
	const token = getToken();
	await axios.post(
		import.meta.env.VITE_API_BASE_URL + "/pokemon/save",
		pokemon,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
};

export const updatePokemon = async (pokemon: Pokemon): Promise<void> => {
	const token = getToken();
	await axios.put(
		import.meta.env.VITE_API_BASE_URL + "/pokemon/update",
		pokemon,
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
};
export const deletePokemon = async (id: string | number): Promise<void> => {
	const token = getToken();
	await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/pokemon/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
