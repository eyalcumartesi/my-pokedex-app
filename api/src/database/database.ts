// src/database.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Database } from "sqlite";

let db: Database | null = null;

export async function initDatabase() {
	db = await open({
		filename: ":memory:",
		driver: sqlite3.Database,
	});

	await db.exec(`CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT,
    salt TEXT,
    favorites TEXT
  )`);
	// database.ts

	await db.exec(`CREATE TABLE IF NOT EXISTS saved_pokemons (
  user_id TEXT,
  pokemon_id TEXT,
  PRIMARY KEY (user_id, pokemon_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)`);
}

export function getDb() {
	if (!db) {
		throw new Error("Database not initialized. Call initDatabase first.");
	}
	return db;
}
