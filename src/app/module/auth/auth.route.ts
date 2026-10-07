import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/me", AuthController.getMe);
router.post("/logout", AuthController.logoutUser);

export const authRouter = router;