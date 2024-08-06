import axios from "axios";
import { Pokemon } from "../types/Pokemon";

const getToken = () => localStorage.getItem("token");

export const fetchSavedPokemons = async (): Promise<Pokemon[]> => {
	const token = getToken();
	const { data } = await axios.get(
		process.env.REACT_APP_API_URL + "/pokemon/save",
		{
			headers: { Authorization: `Bearer ${token}` },
		}
	);
	return data;
};

export const fetchRandomPokemon = async (): Promise<Pokemon> => {
	const { data } = await axios.get(
		process.env.REACT_APP_API_URL + "/pokemon/random"
	);
	return data;
};

export const savePokemon = async (pokemon: Pokemon): Promise<void> => {
	const token = getToken();
	await axios.post(process.env.REACT_APP_API_URL + "/pokemon/save", pokemon, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const deletePokemon = async (id: number): Promise<void> => {
	const token = getToken();
	await axios.delete(`${process.env.REACT_APP_API_URL}/pokemon/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
