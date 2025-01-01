import mongoose from "mongoose";

const communicationLogSchema = new mongoose.Schema(
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
        date: {
            type: Date,
            required: [true, "Date of communication is required"],
        },
        notes: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
    }
);

const CommunicationLog = mongoose.model("CommunicationLog", communicationLogSchema)

export default CommunicationLog;