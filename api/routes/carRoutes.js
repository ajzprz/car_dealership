// carRouter.js
import express from 'express';
import carController from "../controllers/carController.js";
const router = express.Router();


router.get("/", carController.getAllListingsController);
router.post("/", carController.createListingController);
router.get("/:id", carController.getListingController);




export default router;
