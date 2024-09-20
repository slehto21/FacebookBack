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
            res.status(403).json({ message: error.message });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};