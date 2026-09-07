import express from "express";

import { ComplaintController } from "./complaint.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/", auth("CONSUMER"), ComplaintController.createComplaint);
router.get("/", auth("ADMIN", "OPERATOR"), ComplaintController.getAllComplaints);

export const complaintRouter = router;