import Company from "../../models/Company";
import User from "../../models/User";
import { Request, Response } from "express";

export const getAllCompaniesForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  //@ts-ignore
  const { userId, sessionClaims } = req.auth || {};
  const MongoDb = sessionClaims?.metadata?.userId; // Accessing role from publicMetadata

  if (!userId || !MongoDb) {
    res.status(400).json({
      success: false,
      message: "Invalid User",
      data: null,
    });
    return;
  }

  const companiesAssignedToUser = await Company.findById(MongoDb);
  if (!companiesAssignedToUser) {
    res.status(404).json({
      success: false,
      message: "No companies assigned to this user",
      data: null,
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Companies fetched successfully",
    data: companiesAssignedToUser,
  });
};
