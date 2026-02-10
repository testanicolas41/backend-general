import { Router } from 'express';
import FinanzController from './controller';
const router = Router();

router.get("/dashboard", FinanzController.getDashboard);

export default router;
