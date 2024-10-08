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

export const validateUserDetails = (req, res, next) => {
    const { firstName, lastName, email, password, birthdate } = req.body;
    let invalidFields = [];
    
    if(!firstName ||firstName.trim() === '' || firstName.length < 2 || firstName.length > 50 || firstName.match(/[^a-zA-Z]/)){
        invalidFields.push('firstName: must be between 2 and 50 characters long and contain only letters');
    }
    if(!lastName || lastName.trim() === '' || lastName.length < 2 || lastName.length > 50 || lastName.match(/[^a-zA-Z]/)){
        invalidFields.push('lastName: must be between 2 and 50 characters long and contain only letters');
    }
    if(!email || email.trim() === '' || !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        invalidFields.push('email: must be a valid email address');
    }
    if(!password || password.trim() === '' || password.length < 8 || password.length > 100){
        invalidFields.push('password: must be between 8 and 100 characters long');
    }
    if(!birthdate || birthdate.trim() === '' || !birthdate.match(/^\d{4}-\d{2}-\d{2}$/) || new Date().getFullYear() - new Date(birthdate).getFullYear() < 13){
        invalidFields.push('birthdate: must be in the format YYYY-MM-DD and the user must be at least 13 years old');
    }
    if(invalidFields.length > 0){
        return res.status(400).json({ message: "Invalid fields", invalidFields });
    }
    return next();
};