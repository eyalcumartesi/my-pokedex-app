import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import pokemonRoutes from "./routes/pokemonRoutes";
import customPokemonRoutes from "./routes/customPokemonRoutes";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/custom-pokemon", customPokemonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
