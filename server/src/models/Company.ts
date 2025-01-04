import mongoose from "mongoose";

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
            default: []

        },
        notes: {
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