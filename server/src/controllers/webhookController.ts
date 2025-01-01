import { clerkClient } from "@clerk/express";
import User from "../models/User";
import { NextFunction, Request, Response } from 'express';

const handleUserCreated = async (data: any) => {
    const { id, email_addresses, image_url, first_name, last_name } = data;

    if (!email_addresses || email_addresses.length === 0) {
        throw new Error("Email addresses are required");
    }

    const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        profileImageUrl: image_url || "",
        role: "user",
    };

    const newUser = await User.create(user);

    if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
            privateMetadata: {
                userId: newUser._id.toString(),
            },
        });
    }
};

const handleUserUpdated = async (data: any) => {
    const { id, email_addresses, image_url, first_name, last_name } = data;

    if (!email_addresses || email_addresses.length === 0) {
        throw new Error("Email addresses are required");
    }

    const user = {
        email: email_addresses[0].email_address,
        firstName: first_name || "",
        lastName: last_name || "",
        profileImageUrl: image_url || "",
    };

    await User.findOneAndUpdate({ clerkId: id }, user);
}

const handleUserDeleted = async (data: any) => {
    const { id } = data;

    const deletedUser = await User.deleteOne({
        clerkId: id,
    });
}

const handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Clerk Webhook Called");

    const { type, data } = req.body;

    console.log("Webhook payload received:", {
        type,
        data,
    });

    try {
        switch (type) {
            case 'user.created':
                console.log("Processing 'user.created' event...");
                await handleUserCreated(data);
                console.log("'user.created' event processed successfully.");
                break;

            case 'user.updated':
                console.log("Processing 'user.updated' event...");
                await handleUserUpdated(data);
                console.log("'user.updated' event processed successfully.");
                break;

            case 'user.deleted':
                console.log("Processing 'user.deleted' event...");
                await handleUserDeleted(data);
                console.log("'user.deleted' event processed successfully.");
                break;

            default:
                console.warn(`Unhandled webhook event type: ${type}`);
                break;
        }

        res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (error: any) {
        console.error('Error processing webhook:', {
            type,
            data,
            error: error.message,
        });
        res.status(500).json({ error: 'Internal server error' });
    }
};


export { handleWebhook };