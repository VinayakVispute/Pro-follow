import express from "express";
import {
  createCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
  searchCompany,
  assignUserToCompany,
} from "../controllers/companyController";

const router = express.Router();

// Create a new company
router.post("/", createCompany);

// Get all companies
router.get("/", getAllCompanies);

// Update a company by ID
router.patch("/:id", updateCompany);

// Delete a company by ID
router.delete("/:id", deleteCompany);

//Search the company
router.get("/search", searchCompany);

// assign a user to a company
router.post("/assign", assignUserToCompany);

export default router;
