import { handleWebhook } from "../controllers/webhookController";
import validateWebhook from "../middleware/validateWebhook";
import express from "express";


const router = express.Router();

router.post("/clerk", validateWebhook, handleWebhook)

export default router;