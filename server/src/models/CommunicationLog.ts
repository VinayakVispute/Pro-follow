import mongoose, { Types, Model } from "mongoose";

export interface ICommunicationLog {
  _id: Types.ObjectId;
  company: Types.ObjectId;
  performedBy: Types.ObjectId;
  method: Types.ObjectId;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const communicationLogSchema = new mongoose.Schema<ICommunicationLog>(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    method: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommunicationMethod",
      required: [true, "Communication Method is required"],
    },

    notes: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CommunicationLog: Model<ICommunicationLog> =
  mongoose.model<ICommunicationLog>("CommunicationLog", communicationLogSchema);

export default CommunicationLog;
