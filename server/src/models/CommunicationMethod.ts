import mongoose, { Types, Model } from "mongoose";


export interface ICommunicationMethod {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    sequence: number;
    mandatory: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

const communicationMethodSchema = new mongoose.Schema<ICommunicationMethod>(
    {
        name: {
            type: String,
            required: [true, "Communication method name is required"],
        },
        description: {
            type: String,
            trim: true,
        },
        sequence: {
            type: Number,
            required: [true, "Sequence number is required"],
        },
        mandatory: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const CommunicationMethod: Model<ICommunicationMethod> = mongoose.model<ICommunicationMethod>('CommunicationMethod', communicationMethodSchema);


export default CommunicationMethod;


/*
const methods = [
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: false },
    { name: "LinkedIn Message", description: "Direct LinkedIn message", sequence: 2, mandatory: true },
    { name: "Email", description: "Send an email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call the company", sequence: 4, mandatory: false },
    { name: "Other", description: "Custom communication", sequence: 5, mandatory: false },
];
*/