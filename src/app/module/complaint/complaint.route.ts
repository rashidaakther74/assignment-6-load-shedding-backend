import express from "express";

import { ComplaintController } from "./complaint.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("CONSUMER"), ComplaintController.createComplaint);
router.get("/", auth("ADMIN", "OPERATOR"), ComplaintController.getAllComplaints);
router.put("/:id", auth("ADMIN", "OPERATOR"), ComplaintController.updateComplaint);
router.delete("/:id", auth("ADMIN"), ComplaintController.deleteComplaint);

export const complaintRouter = router;