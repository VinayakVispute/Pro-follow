import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhookRoutes";
import connectDB from "./config/database";
import { clerkMiddleware } from "@clerk/express";
import companyRoutes from "./routes/companyRoutes";
import { ensureAdminRole } from "./middleware/authenticateRoutes";

dotenv.config();

const app = express();

app.use(
    clerkMiddleware({
        publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
        secretKey: process.env.CLERK_SECRET_KEY,
        debug: true, // For debugging Clerk's behavior
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/webhooks", webhookRoutes);
app.use("/api/companies", ensureAdminRole(true), companyRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!! Server is up and running!");
});

const PORT = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error("Server error:", error);
        process.exit(1);
    }
};

start();
