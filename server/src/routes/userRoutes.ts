import express from "express";
import { getAllUsersAsPerRole } from "../controllers/admins/userController";
const router = express.Router();

router.get("/:role", getAllUsersAsPerRole);

export default router;
