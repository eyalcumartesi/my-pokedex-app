import { Request, Response } from "express";
import { PokemonService } from "../services/PokemonService";

const pokemonService = new PokemonService();

export class PokemonController {
	static async getPokemon(req: Request, res: Response) {
		const { id } = req.params;
		const pokemon = await pokemonService.getPokemon(id);
		if (!pokemon) {
			return res.status(404).send("Pokemon not found");
		}
		res.status(200).send(pokemon);
	}

	static async listPokemons(req: Request, res: Response) {
		const { limit = 20, offset = 0 } = req.query;
		const pokemons = await pokemonService.listPokemons(
			Number(limit),
			Number(offset)
		);
		res.status(200).send(pokemons);
	}

	static async searchPokemons(req: Request, res: Response) {
		const { query } = req.query;
		if (!query) {
			return res.status(400).send("Query is required");
		}
		const pokemons = await pokemonService.searchPokemons(query.toString());
		res.status(200).send(pokemons);
	}
}
