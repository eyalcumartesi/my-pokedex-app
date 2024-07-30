import { CustomPokemon } from "../models/CustomPokemon";
import localforage from "localforage";

export class CustomPokemonService {
	private customPokemons: Map<string, CustomPokemon>;

	constructor() {
		this.customPokemons = new Map<string, CustomPokemon>();
	}

	async createCustomPokemon(
		name: string,
		height: number,
		weight: number,
		userId: string
	): Promise<CustomPokemon> {
		const customPokemon = new CustomPokemon(name, height, weight, userId);
		this.customPokemons.set(customPokemon.id, customPokemon);
		await localforage.setItem(
			`custom_pokemon_${customPokemon.id}`,
			customPokemon
		);
		return customPokemon;
	}

	async getCustomPokemon(id: string): Promise<CustomPokemon | null> {
		const cachedPokemon = await localforage.getItem<CustomPokemon>(
			`custom_pokemon_${id}`
		);
		return cachedPokemon || null;
	}

	async updateCustomPokemon(
		id: string,
		name: string,
		height: number,
		weight: number
	): Promise<CustomPokemon | null> {
		const customPokemon = await this.getCustomPokemon(id);
		if (!customPokemon) {
			return null;
		}
		customPokemon.name = name;
		customPokemon.height = height;
		customPokemon.weight = weight;
		await localforage.setItem(`custom_pokemon_${id}`, customPokemon);
		return customPokemon;
	}

	async deleteCustomPokemon(id: string): Promise<boolean> {
		const customPokemon = await this.getCustomPokemon(id);
		if (!customPokemon) {
			return false;
		}
		this.customPokemons.delete(id);
		await localforage.removeItem(`custom_pokemon_${id}`);
		return true;
	}

	async listCustomPokemons(userId: string): Promise<CustomPokemon[]> {
		const customPokemons: CustomPokemon[] = [];
		await localforage.iterate((value: CustomPokemon, key) => {
			if (key.startsWith("custom_pokemon_") && value.userId === userId) {
				customPokemons.push(value);
			}
		});
		return customPokemons;
	}
}
