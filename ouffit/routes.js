const express = require("express");
const router = express.Router();
const OuffitController = require('./controller')

router.get("/pants", OuffitController.getAllPants);
router.get("/pants/:id", OuffitController.getPantById);
router.put("/pant/:id", OuffitController.updatePant);

router.get("/shirts", OuffitController.getAllShirts);
router.get("/shirts/:id", OuffitController.getShirtById);
router.put("/shirt/:id", OuffitController.updateShirt);

module.exports = router;