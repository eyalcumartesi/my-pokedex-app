// src/services/UserService.ts
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "../database/database";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

class UserService {
	async addUser(username: string, password: string): Promise<any> {
		const db = getDb();
		const salt = crypto.randomBytes(16).toString("hex");
		const hashedPassword = this.hashPassword(password, salt);
		const id = uuidv4();

		const secret = speakeasy.generateSecret({ length: 20 });

		console.log(username);

		try {
			const existingUser = await this.getUser(username);
			if (existingUser) {
				throw new Error("User already exists");
			}

			await db.run(
				`INSERT INTO users (id, username, password, salt, favorites, two_factor_secret) VALUES (?, ?, ?, ?, ?, ?)`,
				id,
				username,
				hashedPassword,
				salt,
				JSON.stringify([]),
				secret.base32
			);
			return {
				id,
				username,
				password: hashedPassword,
				favorites: [],
				twoFactorSecret: secret.base32,
			};
		} catch (err) {
			console.error(`Error in addUser: ${err.message}`);
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
			console.error(`Error in getUser: ${err.message}`);
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

	async generate2FASecret(userId: string): Promise<string> {
		const db = getDb();
		const secret = speakeasy.generateSecret({ length: 20 });

		try {
			await db.run(
				`UPDATE users SET two_factor_secret = ? WHERE id = ?`,
				secret.base32,
				userId
			);
			return secret.base32;
		} catch (err) {
			console.error(`Error in generate2FASecret: ${err.message}`);
			throw new Error(err.message);
		}
	}

	async verify2FACode(userId: string, code: string): Promise<boolean> {
		const db = getDb();
		try {
			const user = await db.get(
				`SELECT two_factor_secret FROM users WHERE id = ?`,
				userId
			);
			if (!user || !user.two_factor_secret) {
				throw new Error("2FA is not enabled for this user");
			}
			const verified = speakeasy.totp.verify({
				secret: user.two_factor_secret,
				encoding: "base32",
				token: code,
			});
			return verified;
		} catch (err) {
			console.error(`Error in verify2FACode: ${err.message}`);
			throw new Error(err.message);
		}
	}

	async generate2FAQrCode(userId: string): Promise<string> {
		const db = getDb();
		try {
			const user = await db.get(
				`SELECT two_factor_secret FROM users WHERE id = ?`,
				userId
			);
			const otpauthUrl = speakeasy.otpauthURL({
				secret: user.two_factor_secret,
				label: `Your App (${userId})`,
				encoding: "base32",
			});
			return QRCode.toDataURL(otpauthUrl);
		} catch (err) {
			console.error(`Error in generate2FAQrCode: ${err.message}`);
			throw new Error(err.message);
		}
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
			console.error(`Error in savePokemon: ${err.message}`);
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
			console.error(`Error in getSavedPokemons: ${err.message}`);
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
			console.error(`Error in deletePokemon: ${err.message}`);
			throw new Error(err.message);
		}
	}
}

export default UserService;
