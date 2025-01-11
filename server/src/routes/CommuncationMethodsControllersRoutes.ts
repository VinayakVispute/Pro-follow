import express from "express";
import {
  getAllCommunicationMethod,
  createCommunicationMethod,
  updateCommunicationMethod,
  deleteCommunicationMethod,
  moveCommunicationMethod,
} from "../controllers/CommunicationMethodsControllers";

const router = express.Router();

router.get("/", getAllCommunicationMethod);
router.post("/", createCommunicationMethod);
router.put("/:id", updateCommunicationMethod);
router.delete("/:id", deleteCommunicationMethod);
router.put("/move/:id", moveCommunicationMethod);

export default router;
