import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class AuthController {
	static async signUp(req: Request, res: Response) {
		const { username, password } = req.body;
		if (await userService.getUser(username)) {
			return res.status(400).send("User already exists");
		}
		const user = await userService.addUser(username, password);
		res.status(201).send(user);
	}

	static async signIn(req: Request, res: Response) {
		const { username, password } = req.body;
		const user = await userService.authenticate(username, password);
		if (!user) {
			return res.status(400).send("Invalid credentials");
		}
		res.status(200).send(user);
	}

	static signOut(req: Request, res: Response) {
		// Add sign-out logic if needed (e.g., token invalidation)
		res.status(200).send("Signed out");
	}
}
