import express from "express";

import { UserController } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();
router.get("/", auth("ADMIN"), UserController.getAllUsers);
router.get("/:id", auth("ADMIN", "OPERATOR", "CONSUMER"), UserController.getUserById);
router.put("/:id", auth("ADMIN", "CONSUMER"), UserController.updateUser);

export const userRouter = router;