import User from "../models/User";
import { Request, Response } from "express";

export const getAllUsersAsPerRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.params;

    if (role !== "admin" && role !== "user") {
      res.status(400).json({
        success: false,
        message: "Invalid Role",
        data: null,
      });
    }

    const users = await User.find({
      role: role,
    }).sort({
      firstName: 1,
    });

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: users,
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
