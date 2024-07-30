import { Request, Response } from "express";
import { CustomPokemonService } from "../services/CustomPokemonService";

const customPokemonService = new CustomPokemonService();

export class CustomPokemonController {
	static async createCustomPokemon(req: Request, res: Response) {
		const { name, height, weight, userId } = req.body;
		const customPokemon = await customPokemonService.createCustomPokemon(
			name,
			height,
			weight,
			userId
		);
		res.status(201).send(customPokemon);
	}

	static async getCustomPokemon(req: Request, res: Response) {
		const { id } = req.params;
		const customPokemon = await customPokemonService.getCustomPokemon(id);
		if (!customPokemon) {
			return res.status(404).send("Custom Pokemon not found");
		}
		res.status(200).send(customPokemon);
	}

	static async updateCustomPokemon(req: Request, res: Response) {
		const { id } = req.params;
		const { name, height, weight } = req.body;
		const customPokemon = await customPokemonService.updateCustomPokemon(
			id,
			name,
			height,
			weight
		);
		if (!customPokemon) {
			return res.status(404).send("Custom Pokemon not found");
		}
		res.status(200).send(customPokemon);
	}

	static async deleteCustomPokemon(req: Request, res: Response) {
		const { id } = req.params;
		const success = await customPokemonService.deleteCustomPokemon(id);
		if (!success) {
			return res.status(404).send("Custom Pokemon not found");
		}
		res.status(200).send("Custom Pokemon deleted");
	}

	static async listCustomPokemons(req: Request, res: Response) {
		const { userId } = req.params;
		const customPokemons =
			await customPokemonService.listCustomPokemons(userId);
		res.status(200).send(customPokemons);
	}
}
