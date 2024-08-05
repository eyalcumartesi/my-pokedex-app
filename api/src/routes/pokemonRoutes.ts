// src/routes/pokemonRoutes.ts
import { Router } from "express";
import {
	getRandomPokemon,
	getSavedPokemons,
	savePokemon,
	deletePokemon,
} from "../controllers/PokemonController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/random", getRandomPokemon);
router.get("/save", authMiddleware, getSavedPokemons);
router.post("/save", authMiddleware, savePokemon);
router.delete("/:id", authMiddleware, deletePokemon);

export default router;
