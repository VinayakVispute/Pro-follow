import express from "express";
import { getAllUsersAsPerRole } from "../controllers/userController";
const router = express.Router();

router.get("/:role", getAllUsersAsPerRole);

export default router;
