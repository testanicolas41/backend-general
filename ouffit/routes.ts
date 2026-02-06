import express from 'express';
import { Router } from 'express';
import OuffitController from './controller';
const router = Router();

router.get("/pants", OuffitController.getAllPants);
router.get("/pants/:id", OuffitController.getPantById);
router.put("/pant/:id", OuffitController.updatePant);

router.get("/shirts", OuffitController.getAllShirts);
router.get("/shirts/:id", OuffitController.getShirtById);
router.put("/shirt/:id", OuffitController.updateShirt);

router.get("/arm", OuffitController.armOuffit)

export default router;