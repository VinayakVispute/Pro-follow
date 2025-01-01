import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhookRoutes"
import connectDB from "./config/database"
import { clerkMiddleware } from '@clerk/express'



dotenv.config();

const app = express();
app.use(clerkMiddleware({
    debug: true
}
));




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//Routes

app.use("/webhooks", webhookRoutes)

app.get("/", (req, res) => {
    res.send("Hello World!! Server is up and running!")
})


const PORT = process.env.PORT || 8000;



const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error: any) {
        console.error('Server error:', error);
        process.exit(1);
    }
}

start();