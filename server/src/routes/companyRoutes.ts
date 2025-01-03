import express from "express";
import {
    createCompany,
    getAllCompanies,
    updateCompany,
    deleteCompany,
} from "../controllers/companyController";

const router = express.Router();

// Create a new company
router.post("/", createCompany);

// Get all companies
router.get("/", getAllCompanies);

// Update a company by ID
router.put("/:id", updateCompany);

// Delete a company by ID
router.delete("/:id", deleteCompany);

export default router;
