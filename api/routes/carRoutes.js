// carRouter.js
import express from 'express';
import { createListingController, getListingController, getAllListingsController } from '../controllers/carController.js';

const router = express.Router();

router.post("/create", createListingController);
router.get("/get/:id", getListingController);
router.get("/get", getAllListingsController);

export default router;
