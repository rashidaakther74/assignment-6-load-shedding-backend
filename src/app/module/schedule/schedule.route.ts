import express from 'express';

import { ScheduleController } from './schedule.controller';
import { ScheduleValidations } from './schedule.validation';
import auth from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

// ADMIN & OPERATOR: Create Schedule
router.post(
    '/',
    auth('ADMIN', 'OPERATOR'),
    validateRequest(ScheduleValidations.createScheduleValidationSchema),
    ScheduleController.createSchedule
);

// ALL (ADMIN, OPERATOR, CONSUMER): Get All Schedules
router.get(
    '/',
    auth('ADMIN', 'OPERATOR', 'CONSUMER'),
    ScheduleController.getAllSchedules
);
router.get('/:id', ScheduleController.getSingleSchedule);

// ADMIN & OPERATOR: Update Schedule
router.put(
    '/:id',
    auth('ADMIN', 'OPERATOR'),
    validateRequest(ScheduleValidations.updateScheduleValidationSchema),
    ScheduleController.updateSchedule
);

// ADMIN: Delete Schedule
router.delete(
    '/:id',
    auth('ADMIN'),
    ScheduleController.deleteSchedule
);

export const ScheduleRoutes = router;