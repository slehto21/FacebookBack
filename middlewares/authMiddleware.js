import { verifyToken } from "../config/jwt.js";

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);
            req.user = user;
            next();
        } catch (error) {
            res.status(403).json({ message: "Invalid or expired token" });
        }
    } else {
        res.status(401).json({ message: "Authorization token missing" });
    }
};

export const authorizeUser = (req, res, next) => {
    const { id } = req.params;
    // Check if the user is authorized to perform the action
    if (req.user.id !== parseInt(id)) {
        return res.status(403).json({ message: "You are not authorized to perform this action" });
    }

    next();
};
