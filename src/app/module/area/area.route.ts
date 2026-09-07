import express from "express";

import { AreaController } from "./area.controller";
import auth from "../../middleware/auth";

const router = express.Router();
router.post("/", auth("ADMIN", "OPERATOR"), AreaController.createArea);
router.get("/", AreaController.getAllAreas);
router.get("/:id", AreaController.getAreaById);
router.put("/:id", auth("ADMIN", "OPERATOR"), AreaController.updateArea);
router.delete("/:id", auth("ADMIN"), AreaController.deleteArea);

export const areaRouter = router;