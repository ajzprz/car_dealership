// carRouter.js
import express from 'express';
import customerController from "../controllers/userController.js";
const router = express.Router();



router.get("/", customerController.home);
router.post("/register", customerController.register);
router.post("/login", customerController.login);


export default router;
