import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

// Middleware to restrict access based on role
export const ensureAdminRole = (isAdminRequired: boolean) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        // @ts-ignore
        const { userId, sessionClaims } = req.auth || {};
        const role = sessionClaims?.metadata?.role; // Accessing role from publicMetadata
        console.log({
            // @ts-ignore
            authentication: req.auth,
            role: role,
        })
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized. Please log in.",
            });
            return;
        }

        const isAdmin = role === "admin";

        // Restrict users if admin access is required
        if (isAdminRequired && !isAdmin) {
            res.status(403).json({
                success: false,
                message: "Forbidden. Admin access only.",
            });
            return;
        }

        // Allow admins or users with appropriate access
        if (isAdmin || !isAdminRequired) {
            next();
            return;
        }

        // Fallback for denied access
        res.status(403).json({
            success: false,
            message: "Forbidden. You do not have permission to access this route.",
        });
        return;
    };
};
