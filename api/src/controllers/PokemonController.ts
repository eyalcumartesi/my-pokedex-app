import { Request, Response } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";

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
		const savedPokemonIds = await userService.getSavedPokemons(userId);
		const pokemonDataPromises = savedPokemonIds.map((id) =>
			axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		);
		const pokemonDataResponses = await Promise.all(pokemonDataPromises);
		const fullPokemonData = pokemonDataResponses.map(
			(response) => response.data
		);
		res.json(fullPokemonData);
	} catch (error) {
		res.status(500).json({ message: "Error fetching saved Pokémon data" });
	}
};

export const savePokemon = async (req: Request, res: Response) => {
	const userId = getUserIdFromToken(req);
	if (!userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const { id } = req.body;

	try {
		await userService.savePokemon(userId, id);
		res.status(201).json({ id });
	} catch (error) {
		res.status(500).json({ message: "Error saving Pokémon" });
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
