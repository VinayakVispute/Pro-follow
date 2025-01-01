import { WebhookEvent } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import { Webhook } from "svix";
const validateWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Starting webhook validation...");

    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        console.error("WEBHOOK_SECRET is missing from environment variables.");
        res.status(500).json({ error: "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local" });
        return;
    }
    console.log("WEBHOOK_SECRET retrieved successfully.");

    const headerPayload = req.headers as Record<string, string | string[]>;
    const svix_id = headerPayload["svix-id"] as string | undefined;
    const svix_timestamp = headerPayload["svix-timestamp"] as string | undefined;
    const svix_signature = headerPayload["svix-signature"] as string | undefined;

    console.log("Headers received:", {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
    });

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Missing required headers:", {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
        res.status(400).json({ error: "Missing required headers" });
        return;
    }

    const payload = req.body;
    const body = JSON.stringify(payload);

    console.log("Request body received:", body);

    const wh = new Webhook(WEBHOOK_SECRET);

    try {
        const evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
        console.log("Webhook verification successful:", evt);
        next();
    } catch (err) {
        console.error("Webhook verification failed:", err);
        res.status(400).json({ error: "Invalid webhook signature" });
        return;
    }
};

export default validateWebhook;