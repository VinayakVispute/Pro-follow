import { Request, Response } from "express";
import { clerkClient } from "@clerk/express";
import Company from "../../models/Company";
import CommunicationLog from "../../models/CommunicationLog";
import {
  calculateNextCommunication,
  isCompanyDueToday,
  isCompanyOverdue,
} from "../../utils";
import { getAllCommunicationMethodFun } from "../CommunicationMethodsControllers";

export const getAllCompaniesForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //@ts-ignore
    const { userId, sessionClaims } = req.auth || {};
    const user = await clerkClient.users.getUser(userId);
    const MongoDb = user.privateMetadata?.userId;

    if (!userId || !MongoDb) {
      console.log("Authentication failed - missing userId or MongoDb:", {
        userId,
        MongoDb,
      });
      res.status(400).json({
        success: false,
        message: "Invalid User",
        data: null,
      });
      return;
    }

    console.log("Querying companies for MongoDb ID:", MongoDb);

    const companiesAssignedToUser = await Company.find({
      assignedTo: MongoDb,
    });
    const companiesPromise = companiesAssignedToUser.map(async (company) => {
      console.log("THis is company.id", company.id);
      const communications = await CommunicationLog.find({
        company: company.id,
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("company performedBy method");

      return {
        ...company.toJSON(),
        lastFiveCommunications: communications ?? [],
      };
    });

    const communicationMethod = getAllCommunicationMethodFun();

    const [companies, communicationMethods] = await Promise.all([
      Promise.all(companiesPromise),
      communicationMethod,
    ]);

    console.log("Query result:", companies);

    if (!companiesAssignedToUser) {
      console.log("No companies found for user:", MongoDb);
      res.status(404).json({
        success: false,
        message: "No companies assigned to this user",
        data: null,
      });
      return;
    }

    if (!communicationMethods || !communicationMethods.data) {
      console.log("No communication methods found");
      res.status(404).json({
        success: false,
        message: "No communication methods found",
        data: null,
      });
    }

    console.log("Successfully found companies for user:", {
      userId,
      companiesCount: companiesAssignedToUser ? 1 : 0,
    });

    const companiesWithCommunications = companies.map((company: any) => ({
      ...company,
      isOverdue: company.lastFiveCommunications.some((comm: any) =>
        isCompanyOverdue(
          new Date(comm.createdAt),
          company.communicationPeriodicity
        )
      ),
      isDueToday: company.lastFiveCommunications.some((comm: any) =>
        isCompanyDueToday(
          new Date(comm.createdAt),
          company.communicationPeriodicity
        )
      ),
      nextScheduledCommunication: calculateNextCommunication(
        company.lastFiveCommunications[0],
        communicationMethods.data!,
        company.communicationPeriodicity
      ),
    }));

    res.status(200).json({
      success: true,
      message: "Companies fetched successfully",
      data: companiesWithCommunications,
    });
  } catch (error: any) {
    console.error("Error in getAllCompaniesForUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
