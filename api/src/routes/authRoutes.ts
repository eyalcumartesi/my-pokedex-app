import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.post("/signout", AuthController.signOut);

export default router;
