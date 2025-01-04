import Company from "../models/Company";
import { Request, Response } from "express";

// Create a new company
export const createCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("createCompany called with body:", req.body);
  try {
    const {
      name,
      location,
      linkedInProfile,
      emails,
      phoneNumbers,
      comments,
      communicationPeriodicity,
    } = req.body;

    // Validate required fields
    if (!name || !emails || emails.length === 0) {
      console.log(
        "Validation failed: Name and at least one email are required."
      );
      res.status(400).json({
        success: false,
        message: "Name and at least one email are required.",
      });
      return;
    }

    const company = new Company({
      name,
      location,
      linkedInProfile,
      emails,
      phoneNumbers,
      comments,
      communicationPeriodicity,
    });

    const savedCompany = await company.save();
    console.log("Company created successfully:", savedCompany);

    res.status(201).json({
      success: true,
      message: "Company created successfully.",
      data: savedCompany,
    });
  } catch (error: any) {
    console.error("Error creating company:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// Get all companies
export const getAllCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("getAllCompanies called");
  try {
    const companies = await Company.find().sort({ createdAt: -1 }); // Sorted by creation date
    console.log("Companies fetched successfully:", companies);
    res.status(200).json({
      success: true,
      data: companies,
      message: "Companies fetched successfully.",
    });
  } catch (error: any) {
    console.error("Error fetching companies:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// Update a company
export const updateCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(
    "updateCompany called with params:",
    req.params,
    "and body:",
    req.body
  );
  try {
    const { id } = req.params;
    const updatedCompanyBody = req.body;
    if (!id) {
      console.log("Validation failed: Company ID is required.");
      res.status(400).json({
        success: false,
        message: "Company ID is required.",
      });
      return;
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      updatedCompanyBody,
      { new: true }
    );

    if (!updatedCompany) {
      console.log("Company not found with ID:", id);
      res.status(404).json({
        success: false,
        message: "Company not found.",
      });
      return;
    }

    console.log("Company updated successfully:", updatedCompany);
    res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: updatedCompany,
    });
  } catch (error: any) {
    console.error("Error updating company:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// Delete a company
export const deleteCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("deleteCompany called with params:", req.params);
  try {
    const { id } = req.params;

    if (!id) {
      console.log("Validation failed: Company ID is required.");
      res.status(400).json({
        success: false,
        message: "Company ID is required.",
      });
      return;
    }

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      console.log("Company not found with ID:", id);
      res.status(404).json({
        success: false,
        message: "Company not found.",
      });
      return;
    }

    console.log("Company deleted successfully with ID:", id);
    res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
      data: deletedCompany,
    });
  } catch (error: any) {
    console.error("Error deleting company:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const searchCompany = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("searchCompany called");
    const { query } = req.query;
    console.log("Query parameter:", query);

    if (!query || typeof query !== "string") {
      console.log("Invalid query parameter");
      res.status(400).json({ error: "Query parameter is required." });
      return;
    }

    // Search for companies by name, email, or phone numbers
    const results = await Company.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive match
        { emails: { $regex: query, $options: "i" } },
        { phoneNumbers: { $regex: query, $options: "i" } },
      ],
    }).select("name emails phoneNumbers"); // Return specific fields

    console.log("Search results:", results);

    res.status(200).json({
      success: true,
      data: results,
      message: "Companies fetched successfully.",
    });
  } catch (error: any) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
    return;
  }
};
