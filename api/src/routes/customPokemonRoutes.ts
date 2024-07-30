import { Router } from "express";
import { CustomPokemonController } from "../controllers/CustomPokemonController";

const router = Router();

router.post("/", CustomPokemonController.createCustomPokemon);
router.get("/:id", CustomPokemonController.getCustomPokemon);
router.put("/:id", CustomPokemonController.updateCustomPokemon);
router.delete("/:id", CustomPokemonController.deleteCustomPokemon);
router.get("/user/:userId", CustomPokemonController.listCustomPokemons);

export default router;
