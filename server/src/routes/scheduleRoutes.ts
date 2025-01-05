import express from "express";
const router = express.Router();
import { getAllCompaniesForUser } from "../controllers/users/scheduleControllers";

router.get("/companies", getAllCompaniesForUser);

export default router;
