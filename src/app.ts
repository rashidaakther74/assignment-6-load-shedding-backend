import cors from "cors";
import express, { Application, Request, Response } from "express";

import { areaRouter } from "./app/module/area/area.route";
import { authRouter } from "./app/module/auth/auth.route";



import { userRouter } from "./app/module/user/user.route";
import { complaintRouter } from "./app/module/complaint/complaint.route";

import { PaymentRoutes } from "./app/module/payment/payment.route";
import { ScheduleRoutes } from "./app/module/schedule/schedule.route";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/areas", areaRouter);
app.use("/api/v1/schedules", ScheduleRoutes);
app.use("/api/v1/complaints", complaintRouter);
app.use("/api/v1/payments", PaymentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send({ Message: "Load Shedding Server Running..." });
});

app.use(globalErrorHandler);

export default app;