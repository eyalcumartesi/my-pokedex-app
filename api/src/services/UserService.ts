// src/services/UserService.ts
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "../database/database";

class UserService {
	async addUser(username: string, password: string): Promise<any> {
		const db = getDb();
		const salt = crypto.randomBytes(16).toString("hex");
		const hashedPassword = this.hashPassword(password, salt);
		const id = uuidv4();

		try {
			await db.run(
				`INSERT INTO users (id, username, password, salt, favorites) VALUES (?, ?, ?, ?, ?)`,
				id,
				username,
				hashedPassword,
				salt,
				JSON.stringify([])
			);
			return { id, username, password: hashedPassword, favorites: [] };
		} catch (err) {
			throw new Error(err.message);
		}
	}

	hashPassword(password: string, salt: string): string {
		return crypto
			.pbkdf2Sync(password, salt, 1000, 64, "sha512")
			.toString("hex");
	}

	async getUser(username: string): Promise<any | null> {
		const db = getDb();
		try {
			const user = await db.get(
				`SELECT * FROM users WHERE username = ?`,
				username
			);
			return user;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async authenticate(username: string, password: string): Promise<any | null> {
		const user = await this.getUser(username);
		if (user && this.hashPassword(password, user.salt) === user.password) {
			return user;
		}
		return null;
	}

	async savePokemon(userId: string, pokemonId: string): Promise<void> {
		const db = getDb();
		try {
			await db.run(
				`INSERT INTO saved_pokemons (user_id, pokemon_id) VALUES (?, ?)`,
				userId,
				pokemonId
			);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async getSavedPokemons(userId: string): Promise<any[]> {
		const db = getDb();
		try {
			const pokemons = await db.all(
				`SELECT pokemon_id FROM saved_pokemons WHERE user_id = ?`,
				userId
			);
			return pokemons.map((p: { pokemon_id: string }) => p.pokemon_id);
		} catch (err) {
			throw new Error(err.message);
		}
	}

	async deletePokemon(userId: string, pokemonId: string): Promise<void> {
		const db = getDb();
		try {
			await db.run(
				`DELETE FROM saved_pokemons WHERE user_id = ? AND pokemon_id = ?`,
				userId,
				pokemonId
			);
		} catch (err) {
			throw new Error(err.message);
		}
	}
}

export default UserService;
