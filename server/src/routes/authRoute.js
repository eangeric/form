import express from "express";
import { getAuth, logoutUser } from "../controllers/authController.js";

const router = express.Router();

router.get("/", getAuth);
router.delete("/", logoutUser);

export default router;
