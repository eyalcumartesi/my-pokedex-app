// src/controllers/AuthController.ts
import { Request, Response } from "express";
import UserService from "../services/UserService";
import jwt from "jsonwebtoken";

const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export class AuthController {
	static async signUp(req: Request, res: Response) {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).send("Username and password are required");
		}

		try {
			if (await userService.getUser(username)) {
				return res.status(400).send("User already exists");
			}
			const user = await userService.addUser(username, password);
			res.status(201).send(user);
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static async signIn(req: Request, res: Response) {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).send("Username and password are required");
		}

		try {
			const user = await userService.authenticate(username, password);
			if (!user) {
				return res.status(400).send("Invalid credentials");
			}
			const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
			res.status(200).json({ token });
		} catch (error) {
			res.status(500).send(error.message);
		}
	}

	static signOut(req: Request, res: Response) {
		res.status(200).send("Signed out");
	}
}
