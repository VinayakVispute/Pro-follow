import mongoose, { Types, Model } from "mongoose";

export interface ICompany {
  _id: Types.ObjectId;
  name: string;
  location: string;
  linkedInProfile: string | null;
  emails: string[];
  phoneNumbers: string[];
  notes?: string;
  communicationPeriodicity:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "quarterly"
    | "yearly";
  assignedTo?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },
    location: {
      type: String,
      required: [true, "Company location is required"],
    },
    linkedInProfile: {
      type: String,
      required: false,
      default: null,
    },
    emails: {
      type: [String],
      required: true,
      validate: {
        validator: function (emails: string[]) {
          return emails && emails.length > 0;
        },
        message: "At least one email address is required",
      },
    },
    phoneNumbers: {
      type: [String],
      required: false,
      default: [],
    },
    notes: {
      type: String,
      required: false,
    },
    communicationPeriodicity: {
      type: String,
      required: false,
      enum: ["weekly", "biweekly", "monthly", "quarterly", "yearly"],
      default: "monthly",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Company: Model<ICompany> = mongoose.model<ICompany>(
  "Company",
  companySchema
);

export default Company;
