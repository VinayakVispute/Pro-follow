import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: [true, "Company is required"],
        },
        message: {
            type: String,
            required: [true, "Notification message is required"],
        },
        status: {
            type: String,
            enum: ["unread", "read"],
            default: "unread",
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
