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
    two_factor_secret TEXT,
    password TEXT,
    salt TEXT,
    favorites TEXT
  )`);

	await db.exec(`CREATE TABLE IF NOT EXISTS saved_pokemons (
    user_id TEXT,
    pokemon_id TEXT,
    name TEXT,
    height INTEGER,
    weight INTEGER,
    base_experience INTEGER,
    types TEXT,
    abilities TEXT,
    sprites TEXT,
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
