// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
		(req as any).user = { id: decoded.id }; // Type assertion to bypass TypeScript error
		next();
	} catch (err) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

export default authMiddleware;
