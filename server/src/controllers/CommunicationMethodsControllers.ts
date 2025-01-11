import { Request, Response } from "express";
import CommunicationMethod from "../models/CommunicationMethod";

export const getAllCommunicationMethod = async (
  req: Request,
  res: Response
) => {
  try {
    const communicationMethods = await CommunicationMethod.find();

    if (!communicationMethods.length) {
      res.status(404).json({
        success: false,
        message: "No communication methods found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: communicationMethods,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving communication methods",
      error: error.message,
    });
    return;
  }
};

export const createCommunicationMethod = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, description, sequence, mandatory } = req.body;

    if (!name || !sequence) {
      res.status(400).json({
        success: false,
        message: "Name and sequence are required fields",
      });
      return;
    }

    const newMethod = new CommunicationMethod({
      name,
      description,
      sequence,
      mandatory: mandatory || false,
    });

    const savedMethod = await newMethod.save();

    res.status(201).json({
      success: true,
      data: savedMethod,
      message: "Communication method added successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error adding communication method",
      error: error.message,
    });
  }
};

export const updateCommunicationMethod = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, description, sequence, mandatory } = req.body;

    if (!name || !sequence) {
      res.status(400).json({
        success: false,
        message: "Name and sequence are required fields",
      });
      return;
    }

    const updatedMethod = await CommunicationMethod.findByIdAndUpdate(
      id,
      { name, description, sequence, mandatory },
      { new: true, runValidators: true }
    );

    if (!updatedMethod) {
      res.status(404).json({
        success: false,
        message: "Communication method not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedMethod,
      message: "Communication method updated successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error updating communication method",
      error: error.message,
    });
    return;
  }
};

export const deleteCommunicationMethod = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const deletedMethod = await CommunicationMethod.findByIdAndDelete(id);

    if (!deletedMethod) {
      res.status(404).json({
        success: false,
        message: "Communication method not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: deletedMethod,
      message: "Communication method deleted successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error deleting communication method",
      error: error.message,
    });
    return;
  }
};

export const moveCommunicationMethod = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { direction } = req.body;

    if (direction !== "up" && direction !== "down") {
      res.status(400).json({
        success: false,
        message: "Invalid direction. Must be 'up' or 'down'",
      });
      return;
    }

    const method = await CommunicationMethod.findById(id);

    if (!method) {
      res.status(404).json({
        success: false,
        message: "Communication method not found",
      });
      return;
    }

    const currentSequence = method.sequence;
    const newSequence =
      direction === "up" ? currentSequence - 1 : currentSequence + 1;

    // Find the method to swap with
    const swapMethod = await CommunicationMethod.findOne({
      sequence: newSequence,
    });

    if (!swapMethod) {
      res.status(400).json({
        success: false,
        message: "Cannot move method further in this direction",
      });
      return;
    }

    // Swap sequences
    method.sequence = newSequence;
    swapMethod.sequence = currentSequence;

    await Promise.all([method.save(), swapMethod.save()]);

    // Fetch all methods to return updated list
    const updatedMethods = await CommunicationMethod.find().sort("sequence");

    res.status(200).json({
      success: true,
      data: updatedMethods,
      message: "Communication method moved successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error moving communication method",
      error: error.message,
    });
    return;
  }
};

export const getAllCommunicationMethodFun = async () => {
  try {
    const communicationMethods = await CommunicationMethod.find();

    if (!communicationMethods.length) {
      return {
        success: false,
        message: "No communication methods found",
      };
    }

    return {
      success: true,
      data: communicationMethods,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Error retrieving communication methods",
      error: error.message,
    };
  }
};
