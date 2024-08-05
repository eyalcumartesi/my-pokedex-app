import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

export class User {
	id: string;
	username: string;
	password: string;
	salt: string;
	favorites: string[];

	constructor(username: string, password: string) {
		this.id = uuidv4();
		this.username = username;
		this.salt = crypto.randomBytes(16).toString("hex");
		this.password = this.hashPassword(password, this.salt);
		this.favorites = [];
	}

	// Method to hash a password with a given salt
	hashPassword(password: string, salt: string): string {
		return crypto
			.pbkdf2Sync(password, salt, 1000, 64, `sha512`)
			.toString(`hex`);
	}

	// Method to compare plain text password with hashed password
	comparePassword(password: string): boolean {
		const hash = this.hashPassword(password, this.salt);
		return this.password === hash;
	}
}
