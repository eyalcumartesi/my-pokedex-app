import { Router } from "express";
import { PokemonController } from "../controllers/PokemonController";

const router = Router();

router.get("/:id", PokemonController.getPokemon);
router.get("/", PokemonController.listPokemons);
router.get("/search", PokemonController.searchPokemons);

export default router;
