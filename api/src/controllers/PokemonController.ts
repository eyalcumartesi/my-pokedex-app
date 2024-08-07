// src/controllers/PokemonController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";
import axios from "axios";

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface DecodedToken {
	id: string;
	iat: number;
	exp: number;
}

const getUserIdFromToken = (req: Request): string | null => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return null;

	const token = authHeader.split(" ")[1];
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
		return decoded.id;
	} catch (error) {
		return null;
	}
};

export const getRandomPokemon = async (req: Request, res: Response) => {
	try {
		const randomId = Math.floor(Math.random() * 898) + 1;
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${randomId}`
		);
		res.status(200).send(response.data);
	} catch (error) {
		res.status(500).json({ message: "Error fetching Pokémon data" });
	}
};

export const getSavedPokemons = async (req: Request, res: Response) => {
	const userId = getUserIdFromToken(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const savedPokemons = await userService.getSavedPokemons(userId);
		res.json(savedPokemons);
	} catch (error) {
		res.status(500).json({ message: "Error fetching saved Pokémon data" });
	}
};

export const savePokemon = async (req: Request, res: Response) => {
	const userId = getUserIdFromToken(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const pokemon = req.body;

	try {
		await userService.savePokemon(userId, pokemon);
		res.status(201).json(pokemon);
	} catch (error) {
		res.status(500).json({ message: "Error saving Pokémon" });
	}
};

export const updatePokemon = async (req: Request, res: Response) => {
	const userId = getUserIdFromToken(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const pokemon = req.body;

	try {
		await userService.updatePokemon(userId, pokemon);
		res.status(200).json(pokemon);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Error updating Pokémon" });
	}
};

export const deletePokemon = async (req: Request, res: Response) => {
	const userId = getUserIdFromToken(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const { id } = req.params;

	try {
		await userService.deletePokemon(userId, id);
		res.status(200).json({ message: "Pokemon deleted" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting Pokémon" });
	}
};
