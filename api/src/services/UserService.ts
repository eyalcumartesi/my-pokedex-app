import { User } from "../models/User";
import localforage from "localforage";

export class UserService {
	private users: Map<string, User>;

	constructor() {
		this.users = new Map<string, User>();
	}

	async addUser(username: string, password: string): Promise<User> {
		const user = new User(username, password);
		this.users.set(username, user);
		await localforage.setItem(`user_${username}`, user);
		return user;
	}

	async getUser(username: string): Promise<User | null> {
		const cachedUser = await localforage.getItem<User>(`user_${username}`);
		if (cachedUser) {
			return cachedUser;
		}
		return this.users.get(username) || null;
	}

	async authenticate(username: string, password: string): Promise<User | null> {
		const user = await this.getUser(username);
		if (user && user.password === password) {
			return user;
		}
		return null;
	}
}
