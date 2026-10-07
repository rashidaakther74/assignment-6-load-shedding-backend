import express from "express";

import { ComplaintController } from "./complaint.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("CONSUMER"), ComplaintController.createComplaint);
router.get("/my-complaints", auth("CONSUMER"), ComplaintController.getMyComplaints);
router.get("/", auth("ADMIN", "OPERATOR"), ComplaintController.getAllComplaints);
router.put("/:id", auth("ADMIN", "OPERATOR"), ComplaintController.updateComplaint);
router.delete("/:id", auth("ADMIN"), ComplaintController.deleteComplaint);
router.delete("/my-complaints/:id", auth("CONSUMER"), ComplaintController.deleteMyComplaint);

export const complaintRouter = router;