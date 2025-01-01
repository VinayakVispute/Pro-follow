import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Company name is required"],
        },
        locaion: {
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
            required: false,
            default: []
        },
        phoneNumbers: {
            type: [String],
            required: false,
            default: []

        },
        comments: {
            type: String,
            required: false,
        },
        communicationPeriodicity: {
            type: String,
            required: false,
            enum: ['weekly', 'biweekly', 'monthly', 'quarterly', 'yearly'],
            default: 'monthly',
        },
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model("Company", companySchema);

export default Company;