import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";
import customPokemonRoutes from "./routes/customPokemonRoutes";
import { initDatabase } from "./database/database";

async function startServer() {
	await initDatabase();

	const app = express();
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
	app.use(cors());

	app.use("/auth", authRoutes);
	app.use("/pokemon", pokemonRoutes);
	app.use("/custom-pokemon", customPokemonRoutes);

	const PORT = process.env.PORT || 5050;
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

startServer().catch((error) => {
	console.error("Failed to start server:", error);
});
