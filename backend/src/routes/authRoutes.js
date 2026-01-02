import express from "express";
import { loginAdmin } from "../controllers/authController.js";
import { validateLogin, handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/login", validateLogin, handleValidationErrors, loginAdmin);

export default router;
