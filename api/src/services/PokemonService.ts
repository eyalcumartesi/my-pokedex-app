import axios from "axios";
import { Pokemon } from "../models/Pokemon";
import localforage from "localforage";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export class PokemonService {
	private pokemons: Map<string, Pokemon>;

	constructor() {
		this.pokemons = new Map<string, Pokemon>();
	}

	async fetchAndCachePokemon(id: string): Promise<Pokemon> {
		const cacheKey = `pokemon_${id}`;
		const cachedPokemon = await localforage.getItem<Pokemon>(cacheKey);
		if (cachedPokemon) {
			return cachedPokemon;
		}

		const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
		const data = response.data;
		const pokemon = new Pokemon(data.id, data.name);
		this.pokemons.set(id, pokemon);
		await localforage.setItem(cacheKey, pokemon);
		return pokemon;
	}

	async getPokemon(id: string): Promise<Pokemon | null> {
		return this.pokemons.get(id) || (await this.fetchAndCachePokemon(id));
	}

	async listPokemons(limit: number, offset: number): Promise<Pokemon[]> {
		const response = await axios.get(`${API_BASE_URL}/pokemon`, {
			params: { limit, offset },
		});
		const data = response.data.results;
		return data.map((item: any) => new Pokemon(item.name, item.url));
	}

	async searchPokemons(query: string): Promise<Pokemon[]> {
		const response = await axios.get(`${API_BASE_URL}/pokemon?limit=1000`);
		const data = response.data.results;
		return data
			.filter((pokemon: any) => pokemon.name.includes(query))
			.map((item: any) => new Pokemon(item.name, item.url));
	}
}
