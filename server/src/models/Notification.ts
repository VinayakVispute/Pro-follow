import mongoose, { Types, Model } from "mongoose";

export interface INotification {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  company: Types.ObjectId;
  message: string;
  status: "unread" | "read";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

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

const Notification: Model<INotification> = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
